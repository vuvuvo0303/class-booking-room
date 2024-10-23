import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "./ui/button";
import useLoading from "@/hooks/use-loading";
import { createUserFace, updateUserFace } from "@/lib/api/user-api";
import useAuthStore from "@/store/AuthStore";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { FaceDescriptor } from "@/types/user";

const FaceRecognition = ({
  userFaceDescriptor,
  rerender,
}: {
  userFaceDescriptor?: FaceDescriptor;
  rerender: () => void;
}) => {
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const { isSubmitting, setIsSubmitting } = useLoading();
  // const [error, setError] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const captureRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream>();
  const [faceDescriptors, setFaceDescriptors] = useState<Float32Array[]>([]);
  // const [emotion, setEmotion] = useState<string>("");
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
        // faceapi.draw.drawFaceLandmarks(canvasRef.current!, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvasRef.current!, resizedDetections);

        // Store face descriptors
        if (resizedDetections.length > 0) {
          // const { expressions } = resizedDetections[0];
          const descriptors = resizedDetections.map((d) => d.descriptor);
          // const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
          //   // @ts-ignore
          //   expressions[a] > expressions[b] ? a : b
          // );
          // setEmotion(dominantEmotion);
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
    if (!loggedUser) return;
    setIsSubmitting(true);
    if (userFaceDescriptor == null) {
      const uploadResult = await createUserFace(
        loggedUser.id,
        Array.from(faceDescriptors[0])
      );
      if (uploadResult.error) {
        toast.error(uploadResult.error);
      } else {
        toast.success("Upload face descriptor successfully");
        setTimeout(() => {
          rerender();
        }, 1000);
      }
    } else {
      const updateResult = await updateUserFace(
        userFaceDescriptor.id,
        Array.from(faceDescriptors[0])
      );
      if (updateResult.error) {
        toast.error(updateResult.error);
      } else {
        toast.success("Upload face descriptor successfully");
        setTimeout(() => {
          rerender();
        }, 1000);
      }
    }
    setIsSubmitting(false);
    // captureImage();
  };
  // const captureImage = () => {
  //   const video = videoRef.current;
  //   const canvas = captureRef.current;
  //   if (canvas == null) return;
  //   if (video == null) return;
  //   const context = canvas.getContext("2d");
  //   if (context == null) return;
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   const imageDataUrl = canvas.toDataURL("image/png");
  //   console.log(imageDataUrl);
  // };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoadingModel && <p>Loading models...</p>}
      {/* {error && <p>Error: {error.message}</p>} */}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader className="animate-spin" />
        ) : userFaceDescriptor ? "Update face descriptor" : "Upload face descriptor"}
      </Button>
      {/* <canvas ref={captureRef}  /> */}
    </div>
  );
};

export default FaceRecognition;
