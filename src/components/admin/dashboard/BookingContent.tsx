import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";

const BookingContent = ({
  fullName,
  profileImageURL,
  room,
  activity,
  roomType,
  slot,
  department,
  bookingDate,
  status,
}: {
  fullName: string;
  profileImageURL: string;
  room: string;
  activity: string;
  roomType: string;
  slot: string;
  department: string;
  bookingDate: Date;
  status: "accepted" | "pending" | "rejected";
}) => {
  var color = "";
  var statusText = "";
  switch (status) {
    case "rejected": {
      color = "red";
      statusText = "Rejected";
      break;
    }
    case "pending": {
      color = "yellow";
      statusText = "Pending";
      break;
    }
    case "accepted": {
      color = "green";
      statusText = "Accepted";
      break;
    }
  }
  return (
    <CardContent className="p-0 border hover:border-blue-400 transition-colors duration-300">
      <div className="flex items-center gap-3 p-3 drop-shadow-md bg-gray-50">
        <Avatar>
          <AvatarImage src={profileImageURL} />
        </Avatar>
        <span>{fullName}</span>
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span>Room:</span>
              <span className="text-stone-400">{room}</span>
            </div>
            <div className="flex gap-2">
              <span>Room type:</span>
              <span className="text-stone-400">{roomType}</span>
            </div>
            <div className="flex gap-2">
              <span>Department:</span>
              <span className="text-stone-400">{department}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span>Activity:</span>
              <span className="text-stone-400">{activity}</span>
            </div>
            <div className="flex gap-2">
              <span>Slot:</span>
              <span className="text-stone-400">{slot}</span>
            </div>
            <div className="flex gap-2">
              <span>Booking Date:</span>
              <span className="text-stone-400">
                {bookingDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <span className={`w-3 h-3 bg-${color}-500 rounded-full`}></span>
          <span className={`mb-1 text-${color}-500`}>{statusText}</span>
        </div>
      </div>
    </CardContent>
  );
};

export default BookingContent;
