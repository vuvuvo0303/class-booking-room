import { Button } from "@/components/ui/button";
import { Slot } from "@/types/slot";
import { formatDateToTimeString } from "@/utils/time";
import { PencilLine, Trash2 } from "lucide-react";

const SlotCard = ({ slot }: { slot: Slot }) => {
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm drop-shadow justify-between flex items-center">
      <div className="font-semibold text-lg">
        <span>{formatDateToTimeString(new Date(slot.startTime), true)}</span>{" "}
        -&nbsp;
        <span>{formatDateToTimeString(new Date(slot.endTime), true)}</span>
      </div>
      <div className="flex gap-2">
        <Button variant={"outline"} className="p-2 aspect-square rounded-full">
          <PencilLine size={15} />
        </Button>
        <Button
          variant={"destructive"}
          className="p-2 aspect-square rounded-full"
        >
          <Trash2 size={15}/>
        </Button>
      </div>
    </div>
  );
};

export default SlotCard;
