import Sidebar from "../../ui/Sidebar/Sidebar";

// import CalculatorList from "./components/CalculatorLlist";

const HistoryLayout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen flex">
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </Sidebar>
    );
}

export default HistoryLayout;
