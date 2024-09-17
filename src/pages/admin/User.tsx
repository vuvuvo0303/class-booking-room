import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const User = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Tài khoản"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
};

export default User;
