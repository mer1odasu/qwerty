import React from "react";
import Layout from "../../../../layout/Layout";
import AdminList from "../../components/AdminList";
import AdminHeader from "../../components/AdminHeader";
import UserTable from "./UserTable";
import { useQuery } from "react-query";
import adminService from "../../../.././../services/admin.service.js";
import Loader from "../../../../ui/Loader.jsx";

const UsersPage = () => {
  const { data, refetch, isLoading } = useQuery(
    ["getAllUsers"],
    () => adminService.getAllUsers(),
    { select: ({ data }) => data }
  );
  console.log(data);
  return (
    <Layout>
      {isLoading && <Loader />}
      <div>
        <AdminList />
        <div className="hidden lg:block lg:pl-80 h-full">
          <AdminHeader />
          <UserTable users={data} />
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
