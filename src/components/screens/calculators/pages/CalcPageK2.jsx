import CalcCountK2 from "../count/CalcCountK2";
import CalculatorHeader from "../components/CalculatorHeader";
import Layout from "../../../layout/Layout";
import CalculatorList from "../components/CalculatorList";

const CalcPageK2 = () => {
  return (
    <Layout>
      <div>
        <CalculatorList />
        <div className="hidden lg:block lg:pl-80 h-full">
          <CalculatorHeader />
          <CalcCountK2 />
        </div>
      </div>
    </Layout>
  );
};

export default CalcPageK2;
