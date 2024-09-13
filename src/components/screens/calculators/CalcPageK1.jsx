import CalcCountK1 from "./CalcCountK1";
import CalculatorHeader from "./components/CalculatorHeader";
import Layout from "../../layout/Layout";
import CalculatorList from "./components/CalculatorList";
const CalcPageK1 = () => {
  return (
    <Layout>
      <CalculatorList />
      <div className="hidden lg:block lg:pl-80 h-full">
        <CalculatorHeader />
        <CalcCountK1 />
      </div>
    </Layout>
  );
};

export default CalcPageK1;
