import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Student = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Sinh viên"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
};

export default Student;
