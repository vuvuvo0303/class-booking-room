import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import Header from "@/components/admin/Header";
import useRerender from "@/hooks/use-rerender";
import { getRoomTypeById, removeActivity, removeCohort } from "@/lib/api/room-type-api";
import useAuthStore from "@/store/AuthStore";
import { RoomTypes } from "@/types/room-type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCohortButton from "./AddCohortButton";
import { LoaderIcon, Trash2 } from "lucide-react";
import useLoading from "@/hooks/use-loading";
import AddActivityButton from "./AddActivityButton";

const RoomTypeDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const { renderKey, rerender } = useRerender();
  const [roomTypeDetail, setRoomTypeDetail] = useState<RoomTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const { roomTypeId } = useParams();
  const basePath = "/" + loggedUser.role;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const detailResult = await getRoomTypeById(parseInt(roomTypeId!));
      if (detailResult.error) {
        toast.error(detailResult.error);
      } else {
        setRoomTypeDetail(detailResult.data);
      }
      setIsLoading(false);
    };
    if (roomTypeId) {
      fetchData();
    }
  }, [renderKey]);

  if (isLoading) return <Loader />;
  if (!isLoading && !roomTypeDetail) {
    return <NotFound />;
  }
  return (
    <div className="bg-white">
      <Header
        currentPage={roomTypeDetail?.name ?? ""}
        breadcrumbItems={[
          { title: "Dashboard", to: basePath },
          { title: "Room Types", to: basePath + "/room-types" },
        ]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">{roomTypeDetail?.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            Created at:{" "}
            {new Date(roomTypeDetail?.createdAt ?? "").toLocaleString()}
          </p>
          <p>
            Updated at:{" "}
            {new Date(roomTypeDetail?.updatedAt ?? "").toLocaleString()}
          </p>
        </div>
        <div className="mt-2 grid grid-cols-12 gap-2">
          <div className="rounded border border-gray-400 col-span-6 overflow-hidden bg-white drop-shadow">
            <div className="p-3 bg-green-500 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Allowed cohort</h3>
              <AddCohortButton rerender={rerender} roomType={roomTypeDetail!} />
            </div>
            <div className="p-3">
              {roomTypeDetail?.allowedCohorts.length == 0 && (
                <span className="text-gray-500">
                  No cohort is allowed to book this room type
                </span>
              )}
              <div className="flex flex-col gap-2">
                {roomTypeDetail?.allowedCohorts.map((cohort) => {
                  return (
                    <CohortCard
                      cohort={cohort}
                      roomTypeId={roomTypeDetail.id}
                      key={`cohort-${cohort.id}`}
                      rerender={rerender}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="rounded border border-gray-400 col-span-6 overflow-hidden bg-white drop-shadow">
            <div className="p-3 bg-green-500 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Allowed Activity</h3>
              <AddActivityButton rerender={rerender} roomType={roomTypeDetail!} />

            </div>
            <div className="p-3">
              {roomTypeDetail?.allowedCohorts.length == 0 && (
                <span className="text-gray-500">
                  No Activity is allowed to book this room type
                </span>
              )}
              <div className="flex flex-col gap-2">
                {roomTypeDetail?.allowedActivities.map((activity) => {
                  return (
                    <ActivityCard
                      activity={activity}
                      roomTypeId={roomTypeDetail.id}
                      key={`activity-${activity.id}`}
                      rerender={rerender}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CohortCard = ({
  cohort,
  roomTypeId,
  rerender,
}: {
  cohort: { id: number; cohortCode: string };
  roomTypeId: number;
  rerender: () => void;
}) => {
  const { isSubmitting, setIsSubmitting } = useLoading();
  const handleRemoveCohort = async () => {
    setIsSubmitting(true);
    const removeResult = await removeCohort(roomTypeId, cohort.id);
    if (removeResult.error) {
      toast.error(removeResult.error);
    } else {
      setTimeout(() => {
        rerender();
      }, 500);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="drop-shadow bg-white rounded p-3 flex justify-between items-center">
      <span>{cohort.cohortCode}</span>
      <button onClick={handleRemoveCohort}>
        {
          isSubmitting ? <LoaderIcon className="text-red-500 h-5 w-5"/> : <Trash2 className="text-red-500 h-5 w-5" />
        }
        
      </button>
    </div>
  );
};
const ActivityCard = ({
  activity,
  roomTypeId,
  rerender,
}: {
  activity: { id: number; name: string };
  roomTypeId: number;
  rerender: () => void;
}) => {
  const { isSubmitting, setIsSubmitting } = useLoading();
  const handleRemoveActivity = async () => {
    setIsSubmitting(true);
    const removeResult = await removeActivity(roomTypeId, activity.id);
    if (removeResult.error) {
      toast.error(removeResult.error);
    } else {
      setTimeout(() => {
        rerender();
      }, 500);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="drop-shadow bg-white rounded p-3 flex justify-between items-center">
      <span>{activity.name}</span>
      <button onClick={handleRemoveActivity}>
        {
          isSubmitting ? <LoaderIcon className="text-red-500 h-5 w-5"/> : <Trash2 className="text-red-500 h-5 w-5" />
        }
        
      </button>
    </div>
  );
};
export default RoomTypeDetail;
