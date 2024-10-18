import { Room } from "@/types/room";
import { Card } from "./ui/card";
import { Tag } from "antd";
import { Button } from "./ui/button";

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="col-span-3 drop-shadow-lg">
      <img
        className="rounded-lg"
        src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
      />
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Room Name:</span>
          <span className="text-black">{room.roomName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Room Type:</span>
          <span className="text-black">{room.roomTypeName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Status :</span>
          <span className="text-black">
            <Tag color="success">{room.status}</Tag>
          </span>
        </div>
        <Button className="bg-green-600 hover:bg-green-600">View detail</Button>
      </div>
    </Card>
  );
};

export default RoomCard;
