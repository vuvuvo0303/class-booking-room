import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";

const ReportContent = ({
    fullName,
    profileImageURL,
    reportDate,
    content,
    status,
  }: {
    fullName: string;
    profileImageURL: string;
    reportDate: Date;
    content: string;
    status: "rejected" | "not_processed_yet" | "processed";
  }) => {
    var color = "";
    var statusText = "";
    switch (status) {
      case "rejected": {
        color = "red";
        statusText = "Rejected";
        break;
      }
      case "not_processed_yet": {
        color = "yellow";
        statusText = "Not proccessed yet";
        break;
      }
      case "processed": {
        color = "green";
        statusText = "Processed";
        break;
      }
    }
    return (
      <CardContent className="p-0 border hover:border-blue-400 transition-colors duration-300">
        <div className="flex items-center justify-between bg-gray-50 p-3 drop-shadow-md">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profileImageURL} />
            </Avatar>
            <span className="font-semibold">{fullName}</span>
          </div>
          <div>
            <span className="text-gray-700 text-sm">
              Report date: {reportDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex">
            <span className="w-100 break-words">{content}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {/* text-green-500 bg-green-500 text-yellow-500 bg-yellow-500 text-red-500 bg-red-500 */}
            <span className={`w-3 h-3 bg-${color}-500 rounded-full`}></span>
            <span className={`mb-1 text-${color}-500`}>{statusText}</span>
          </div>
        </div>
      </CardContent>
    );
  };

export default ReportContent