import EmptyState from "../../ui/EmptyState";
import HistoryLayout from "./HistoryLayout";
// import Layout from "../../layout/Layout"

const History = () => {
    return (
        <HistoryLayout>
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </HistoryLayout>
    );
}

export default History;
