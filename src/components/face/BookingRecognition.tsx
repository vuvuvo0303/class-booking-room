import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "../ui/button";
import { compareFaceDescriptors } from "@/utils/face";
import { Booking } from "@/types/booking";

const BookingRecognition = ({
  bookings,
  setSelectedBooking
}: {
  bookings: Booking[];
  setSelectedBooking: (booking?: Booking) => void
}) => {
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();
  const [faceDescriptors, setFaceDescriptors] = useState<Float32Array[]>([]);
  const [recognizedUser, setRecognizedUser] = useState<string>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    const originalLog = console.log;
    console.log = () => {};
    return () => {
      console.log = originalLog;
    };
  }, []);
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setIsLoadingModel(false);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {},
      });
      streamRef.current = stream;
      videoRef.current!.srcObject = stream;
    };

    if (!isLoadingModel) {
      startVideo();
    }
  }, [isLoadingModel]);

  useEffect(() => {
    const handleVideoPlay = async () => {
      const displaySize = {
        width: videoRef.current!.width,
        height: videoRef.current!.height,
      };
      faceapi.matchDimensions(canvasRef.current!, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current!,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvasRef.current!.width = videoRef.current!.width;
        canvasRef.current!.height = videoRef.current!.height;
        faceapi.draw.drawDetections(canvasRef.current!, resizedDetections);
        if (resizedDetections.length > 0) {
          const descriptors = resizedDetections.map((d) => d.descriptor);
          setFaceDescriptors(descriptors);
        }
      }, 100);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoPlay);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef, isLoadingModel]);
  const handleSubmit = async () => {
    setError(undefined);
    const currentFace = faceDescriptors[0];
    var isFound = false;
    for (const booking of bookings) {
      if (!booking.faceDescriptor) {
        console.log("Error, face descriptor is missing");
        return;
      }
      const compareResult = await compareFaceDescriptors(
        booking.faceDescriptor.descriptor,
        Array.from(currentFace),
        0.37
      );
      if (compareResult) {
        setRecognizedUser(booking.studentEmail);
        setSelectedBooking(booking);
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      setError("Face is not recognized");
      setRecognizedUser(undefined);
      setSelectedBooking(undefined);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-[135px]">
      {isLoadingModel && <p>Loading models...</p>}
      <div className="relative">
        <video ref={videoRef} autoPlay muted width={135} height={105} />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="w-full text-center bg-purple-700 text-white">
        {!isLoadingModel &&
          faceDescriptors.length == 0 &&
          "Cannot detect your face"}
        {!isLoadingModel &&
          faceDescriptors.length > 1 &&
          "Please make sure there is only you in front of the camera"}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!isLoadingModel && faceDescriptors.length != 1}
        className="bg-purple-700 text-white hover:bg-purple-600 my-2"
      >
        Scan
      </Button>
      <p className="bg-purple-700 text-white">{recognizedUser && recognizedUser}</p>

      {<div className="text-red-500 bg-purple-700">{error}</div>}
    </div>
  );
};

export default BookingRecognition;
