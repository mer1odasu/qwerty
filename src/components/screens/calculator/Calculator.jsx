import EmptyState from "../../ui/EmptyState";
import Layout from "../../layout/Layout";

const Calculator = () => {
    return (
        <Layout>
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </Layout>
    );
}

export default Calculator;
