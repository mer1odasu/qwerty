import { useQuery } from "react-query";
import adminService from "../../../services/admin.service";
import Layout from "../../layout/Layout";
import Loader from "../../ui/Loader";

const Admin = () => {
  const { data, refetch, isLoading } = useQuery(
    ["getAllUsers"],
    () => adminService.getAllUsers(),
    { select: ({ data }) => data }
  );
  return (
    <Layout>
      <div>
        <h1>admin</h1>
        {isLoading && <Loader />}
        {data && <p>User Info: {JSON.stringify(data)}</p>}
      </div>
    </Layout>
  );
};
export default Admin;
