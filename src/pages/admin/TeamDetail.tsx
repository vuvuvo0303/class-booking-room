import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const TeamDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Chi tiết team"
        breadcrumbItems={[
          { title: "Trang chủ", to: basePath },
          { title: "Team", to: basePath + "/team" },
        ]}
      />
    </div>
  );
}

export default TeamDetail