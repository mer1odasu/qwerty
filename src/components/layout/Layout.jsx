import Sidebar from "../ui/Sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen">
                {children}
            </div>
        </Sidebar>
    );
}
export default Layout;
