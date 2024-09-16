import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const StudentDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Chi tiết sinh viên"
        breadcrumbItems={[
          { title: "Trang chủ", to: basePath },
          { title: "Sinh viên", to: basePath + "/student" },
        ]}
      />
    </div>
  );
};

export default StudentDetail;
