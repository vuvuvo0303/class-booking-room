import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Staff = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Nhân viên quản lí"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
}

export default Staff