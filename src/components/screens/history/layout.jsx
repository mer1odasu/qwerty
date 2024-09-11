import Sidebar from "../../ui/Sidebar/Sidebar";

import HistoryList from "./components/HistoryList"

const HistoryLayout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen flex">
							<HistoryList />
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </Sidebar>
    );
}

export default HistoryLayout;
