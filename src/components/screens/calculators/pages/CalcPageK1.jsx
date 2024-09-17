import CalcCountK1 from "../count/CalcCountK1";
import CalculatorHeader from "../components/CalculatorHeader";
import Layout from "../../../layout/Layout";
import CalculatorList from "../components/CalculatorList";

const CalcPageK1 = () => {
  return (
    <Layout>
      <div>
        <CalculatorList />
        <div className="hidden lg:block lg:pl-80 h-full">
          <CalculatorHeader />
          <CalcCountK1 />
        </div>
      </div>
    </Layout>
  );
};

export default CalcPageK1;
