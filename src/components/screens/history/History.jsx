import EmptyState from "../../ui/EmptyState";
import Layout from "../../layout/Layout";
import HistoryList from "./components/HistoryList";

const Calculator = () => {
    return (
        <Layout>
					<HistoryList />
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </Layout>
    );
}

export default Calculator;
