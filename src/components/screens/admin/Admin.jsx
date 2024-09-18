import Layout from "../../layout/Layout";
import AdminList from "./components/AdminList";
import EmptyState from "../../ui/EmptyState";

const Admin = () => {
  return (
    <Layout>
      <AdminList />
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    </Layout>
  );
};
export default Admin;
