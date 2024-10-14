import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import {  Card, Image, Input, Select, Tag } from "antd";

const BookingRoom = () => {
  const loggedUser = useAuthStore((state) => state.user);

  const { Search } = Input;

  const onSearch = (value: string, _e?: React.ChangeEvent<HTMLInputElement>, info?: any) => {
    console.log(info?.source, value);
  };

  return (
    <div className="py-20">
      <div className="w-screen bg-blue-900 rounded-md py-9">
        <div className="flex justify-center gap-8">
          <span className="text-6xl">Hello!!</span>
          <span className="text-6xl">{loggedUser?.fullName || "Guest"}</span>
        </div>
        <div className="flex items-center justify-center gap-10 pt-8">
          <div className="w-1/4">
            <div>
              <label htmlFor="roomSearch" className="block text-lg font-medium text-white mb-2">
                Room Name
              </label>
            </div>
            <Search
              id="roomSearch"
              placeholder="Search Room Name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>

          <div>
            <label htmlFor="statusSelect" className="block text-lg font-medium text-white mb-2">
              Status
            </label>
            <Select
              id="statusSelect"
              className="w-[150px]"
              placeholder="Select a status"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                { value: "1", label: "Open" },
                { value: "2", label: "Close" },
                { value: "3", label: "Repairing" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="statusSelect" className="block text-lg font-medium text-white mb-2">
              Room Types
            </label>
            <Select
              id="statusSelect"
              className="w-[170px]"
              placeholder="Select a Room Type"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                { value: "1", label: "Open" },
                { value: "2", label: "Close" },
                { value: "3", label: "Repairing" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="statusSelect" className="block text-lg font-medium text-white mb-2">
              Capacity
            </label>
            <Select
              id="statusSelect"
              className="w-[150px]"
              placeholder="Select a Capacity"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                { value: "1", label: "Open" },
                { value: "2", label: "Close" },
                { value: "3", label: "Repairing" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="py-3">
        <Card className="w-full drop-shadow-lg bg-gradient-to-r from-orange-300 to-orange-500">
            <div className="flex items-center justify-between">
          <div className=" flex gap-16">
            <div className="">
              {" "}
              <Image className="rounded-lg"
                src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
                width={300}
              />
            </div>
            <div className="flex flex-col gap-3 pt-5 ">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Name :</span>
                <span className="text-lg  text-black">615</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Type :</span>
                <span className="text-lg  text-black">Musical</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Status :</span>
                <span className="text-lg  text-black">
                  <Tag color="success">Open</Tag>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">slot:</span>
                <span className="text-lg  text-black">
                  <Tag>1(7h-9h15)</Tag>
                  <Tag>2(9h15-11h45)</Tag>
                  <Tag color="error">3(9h15-11h45)</Tag>
                  <Tag>4(9h15-11h45)</Tag>
                </span>
              </div>
            </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-600"> Booking</Button>
          
          </div>
        </Card>
      </div>
      <div className="py-3">
        <Card className="w-full drop-shadow-lg bg-gradient-to-r from-orange-300 to-orange-500">
            <div className="flex items-center justify-between">
          <div className=" flex gap-16">
            <div className="">
              {" "}
              <Image className="rounded-lg"
                src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
                width={300}
              />
            </div>
            <div className="flex flex-col gap-3 pt-5 ">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Name :</span>
                <span className="text-lg  text-black">615</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Type :</span>
                <span className="text-lg  text-black">Musical</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Status :</span>
                <span className="text-lg  text-black">
                  <Tag color="success">Open</Tag>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">slot:</span>
                <span className="text-lg  text-black">
                  <Tag>1(7h-9h15)</Tag>
                  <Tag>2(9h15-11h45)</Tag>
                  <Tag color="error">3(9h15-11h45)</Tag>
                  <Tag>4(9h15-11h45)</Tag>
                </span>
              </div>
            </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-600"> Booking</Button>
          
          </div>
        </Card>
      </div>
      <div className="py-3">
        <Card className="w-full drop-shadow-lg bg-gradient-to-r from-orange-300 to-orange-500">
            <div className="flex items-center justify-between">
          <div className=" flex gap-16">
            <div className="">
              {" "}
              <Image className="rounded-lg"
                src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
                width={300}
              />
            </div>
            <div className="flex flex-col gap-3 pt-5 ">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Name :</span>
                <span className="text-lg  text-black">615</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Type :</span>
                <span className="text-lg  text-black">Musical</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Status :</span>
                <span className="text-lg  text-black">
                  <Tag color="success">Open</Tag>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">slot:</span>
                <span className="text-lg  text-black">
                  <Tag>1(7h-9h15)</Tag>
                  <Tag>2(9h15-11h45)</Tag>
                  <Tag color="error">3(9h15-11h45)</Tag>
                  <Tag>4(9h15-11h45)</Tag>
                </span>
              </div>
            </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-600"> Booking</Button>
          
          </div>
        </Card>
      </div>
      <div className="py-3">
        <Card className="w-full drop-shadow-lg bg-gradient-to-r from-orange-300 to-orange-500">
            <div className="flex items-center justify-between">
          <div className=" flex gap-16">
            <div className="">
              {" "}
              <Image className="rounded-lg"
                src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
                width={300}
              />
            </div>
            <div className="flex flex-col gap-3 pt-5 ">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Name :</span>
                <span className="text-lg  text-black">615</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Room Type :</span>
                <span className="text-lg  text-black">Musical</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">Status :</span>
                <span className="text-lg  text-black">
                  <Tag color="success">Open</Tag>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-black">slot:</span>
                <span className="text-lg  text-black">
                  <Tag>1(7h-9h15)</Tag>
                  <Tag>2(9h15-11h45)</Tag>
                  <Tag color="error">3(9h15-11h45)</Tag>
                  <Tag>4(9h15-11h45)</Tag>
                </span>
              </div>
            </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-600"> Booking</Button>
          
          </div>
        </Card>
      </div>
      
    </div>
  );
};

export default BookingRoom;
