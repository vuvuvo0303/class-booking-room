import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "../ui/button";
import { FaceDescriptor, User } from "@/types/user";
import { compareFaceDescriptors } from "@/utils/face";

const FaceRecognition = ({
  userDescriptors,
}: {
  userDescriptors: FaceDescriptor[];
}) => {
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();
  const [faceDescriptors, setFaceDescriptors] = useState<Float32Array[]>([]);
  const [recognizedUser, setRecognizedUser] = useState<User>();
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
    for (const userDescriptor of userDescriptors) {
      const compareResult = await compareFaceDescriptors(
        userDescriptor.descriptor,
        Array.from(currentFace), 0.5
      );
      if (compareResult) {
        setRecognizedUser(userDescriptor.user);
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      setError("Face is not recognized");
      setRecognizedUser(undefined);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {isLoadingModel && <p>Loading models...</p>}
      <div className="relative">
        <video ref={videoRef} autoPlay muted width={270} height={210} />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="w-full text-center">
        {!isLoadingModel &&
          faceDescriptors.length == 0 &&
          "Cannot detect your face"}
        {!isLoadingModel &&
          faceDescriptors.length > 1 &&
          "Please make sure there is only you in front of the camera"}
      </div>
      <Button
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
        disabled={!isLoadingModel && faceDescriptors.length != 1}
      >
        Scan
      </Button>
      {
        recognizedUser && recognizedUser.email
      }
      {
        <div className="text-red-500">{error}</div>
      }
    </div>
  );
};

export default FaceRecognition;
