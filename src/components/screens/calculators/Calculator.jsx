import EmptyState from "../../ui/EmptyState";
import Layout from "../../layout/Layout";
import CalculatorList from "./components/CalculatorList";

const Calculator = () => {
    return (
        <Layout>
					<CalculatorList />
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </Layout>
    );
}

export default Calculator;
