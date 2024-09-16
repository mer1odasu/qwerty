import Layout from "../../layout/Layout";
import AdminList from "./components/AdminList";
import EmptyState from "../../ui/EmptyState";

const Admin = () => {
  // const { data, refetch, isLoading } = useQuery(
  //   ["getAllUsers"],
  //   () => adminService.getAllUsers(),
  //   { select: ({ data }) => data }
  // );
  return (
    <Layout>
			<AdminList />
			<div className="hidden lg:block lg:pl-80 h-full">
					<EmptyState />
				</div>
      {/* <div>
        {isLoading && <Loader />}
        {data && <p>User Info: {JSON.stringify(data)}</p>}
      </div> */}
    </Layout>
  );
};
export default Admin;
