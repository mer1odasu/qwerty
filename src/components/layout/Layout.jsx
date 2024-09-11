import Sidebar from "../ui/Sidebar/Sidebar";
import CalculatorList from "../screens/calculator/components/CalculatorLlist";

const Layout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen">
								<CalculatorList />
                {children}
            </div>
        </Sidebar>
    );
}
export default Layout;
