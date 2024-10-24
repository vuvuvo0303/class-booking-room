import FaceRecognition from "@/components/face/FaceRecognition";
import { getAllFaces } from "@/lib/api/user-api";
import { FaceDescriptor } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TestAllFace = () => {
  const [faces, setFaces] = useState<FaceDescriptor[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const faceResult = await getAllFaces();
      if (faceResult.error) {
        toast.error(faceResult.error);
      } else {
        setFaces(faceResult.data);
      }
    }
    fetchData();
  }, [])
  
  return (
    <div>
      {
        faces && (
          <FaceRecognition userDescriptors={faces}/>
        )
      }
     
    </div>
  );
};

export default TestAllFace;
