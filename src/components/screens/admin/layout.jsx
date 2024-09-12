import Sidebar from "../../ui/Sidebar/Sidebar";

import AdminList from "./components/AdminList";

const AdminLayout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen flex">
                <AdminList />
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </Sidebar>
    );
}

export default AdminLayout;
