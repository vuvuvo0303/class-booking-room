import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "./ui/button";

const FaceRecognition = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceDescriptors, setFaceDescriptors] = useState<any[]>([]);
  const [emotion, setEmotion] = useState<string>("");
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setIsLoading(false);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {},
      });
      videoRef.current!.srcObject = stream;
    };

    if (!isLoading) {
      startVideo();
    }
  }, [isLoading]);

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
        faceapi.draw.drawFaceLandmarks(canvasRef.current!, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current!, resizedDetections);

        // Store face descriptors
        if (resizedDetections.length > 0) {
          const { expressions } = resizedDetections[0];
          const descriptors = resizedDetections.map((d) => d.descriptor);
          const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
          // @ts-ignore
            expressions[a] > expressions[b] ? a : b
          );
          setEmotion(dominantEmotion);
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
    };
  }, [videoRef, isLoading]);
  const handleLogData = () => {
    console.log("Face Descriptors:", faceDescriptors);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isLoading && <p>Loading models...</p>}
      {/* {error && <p>Error: {error.message}</p>} */}
      <div className="relative">
        <video ref={videoRef} autoPlay muted width={270} height={210} />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <div className="text-4xl">You are {emotion}</div>
      <Button onClick={handleLogData} style={{ marginTop: "20px" }}>
        Log Face Data
      </Button>
    </div>
  );
};

export default FaceRecognition;
