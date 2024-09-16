import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";

const Dashboard = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Dashboard"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
      <img src="https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png" alt="" />
    </div>
  );
};

export default Dashboard;
