import UploadFace from "@/components/face/UploadFace";
import { Button } from "@/components/ui/button";
import { FaceDescriptor } from "@/types/user";
import { useState } from "react";

const ScanFace = ({
  userFaceDescriptor,
  rerender,
}: {
  userFaceDescriptor?: FaceDescriptor;
  rerender: () => void;
}) => {
  const [cameraTurnOn, setCameraTurnOn] = useState(false);
  const isSaved =
    userFaceDescriptor && userFaceDescriptor.descriptor.length > 0;
  return (
    <div className="p-5 min-h-[200px] flex flex-col justify-center items-start">
      <h3 className="py-2 text-lg text-center w-full">
        {isSaved
          ? "Your face descriptor is already saved in our system. You may continue."
          : "Your face descriptor is not saved in our system yet. Submit your face descriptor to continue"}
      </h3>

      <div className="flex w-full justify-center">
        {cameraTurnOn ? (
          <UploadFace
            userFaceDescriptor={userFaceDescriptor}
            rerender={rerender}
          />
        ) : (
          <div className="w-[270px] h-[210px] bg-gray-300 rounded"></div>
        )}
      </div>
      <div className="mt-3 flex justify-center w-full">
        <Button
          onClick={() => {
            setCameraTurnOn(!cameraTurnOn);
          }}
        >
          Turn {cameraTurnOn ? "off" : "on"} camera
        </Button>
      </div>
    </div>
  );
};

export default ScanFace;
