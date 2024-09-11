import Sidebar from "../../ui/Sidebar/Sidebar";
import CalculatorList from "./components/CalculatorLlist";

const CalcLayout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen flex">
                <CalculatorList />
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </Sidebar>
    );
}

export default CalcLayout;
