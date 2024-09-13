import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar>
        <section className="h-screen flex">
          {children && <div className="flex-grow">{children}</div>}
        </section>
      </Sidebar>
    </div>
  );
};
export default Layout;
