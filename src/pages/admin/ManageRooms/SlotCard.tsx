import { Button } from "@/components/ui/button";
import { Slot } from "@/types/slot";
import { formatDateToTimeString } from "@/utils/time";
import { Trash2 } from "lucide-react";
import UpdateSlot from "./UpdateSlot";
import { deleteRoomSlot } from "@/lib/api/room-api";
import { toast } from "react-toastify";

const SlotCard = ({ slot, rerender }: { slot: Slot; rerender: () => void }) => {
  const handleDeleteSlot = async () => {
    const result = await deleteRoomSlot(slot.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Slot deleted successfully");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  };
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm drop-shadow justify-between flex items-center">
      <div className="font-semibold text-lg">
        <span>{formatDateToTimeString(new Date(slot.startTime), true)}</span>{" "}
        -&nbsp;
        <span>{formatDateToTimeString(new Date(slot.endTime), true)}</span>
      </div>
      <div className="flex gap-2">
        <UpdateSlot slot={slot} rerender={rerender} />
        <Button
          variant={"destructive"}
          className="p-2 aspect-square rounded-full"
          onClick={handleDeleteSlot}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
};

export default SlotCard;
