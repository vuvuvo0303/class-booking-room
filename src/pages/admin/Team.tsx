import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Team = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Team"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
};

export default Team;
