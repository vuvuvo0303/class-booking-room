import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const BookingDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Chi tiết đơn đặt"
        breadcrumbItems={[
          { title: "Trang chủ", to: basePath + "" },
          { title: "Đặt phòng", to: basePath + "/booking" },
        ]}
      />
    </div>
  );
};

export default BookingDetail;
