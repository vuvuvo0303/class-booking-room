import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Booking = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Đặt phòng"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
};

export default Booking;
