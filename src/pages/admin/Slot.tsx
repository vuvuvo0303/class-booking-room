import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Slot = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Slot"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
    </div>
  );
};

export default Slot;
