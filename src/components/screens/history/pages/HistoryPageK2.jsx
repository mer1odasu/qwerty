import HistoryHeader from "../components/HistoryHeader";
import Layout from "../../../layout/Layout";
import HistoryList from "../components/HistoryList";
import HistoryTableK2 from "../table/HistoryTableK2";

const HistoryPageK2 = () => {
  return (
    <Layout>
      <HistoryList />
      <div className="hidden lg:block lg:pl-80 h-full">
        <HistoryHeader />
				<HistoryTableK2 />
      </div>
    </Layout>
  );
};

export default HistoryPageK2;
