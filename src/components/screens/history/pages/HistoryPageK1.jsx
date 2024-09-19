import HistoryHeader from "../components/HistoryHeader";
import Layout from "../../../layout/Layout";
import HistoryList from "../components/HistoryList";
import HistoryTable from "../table/HistoryTable";

const HistoryPageK1 = () => {
  return (
    <Layout>
      <HistoryList />
      <div className="hidden lg:block lg:pl-80 h-full">
        <HistoryHeader />
				<HistoryTable />
      </div>
    </Layout>
  );
};

export default HistoryPageK1;
