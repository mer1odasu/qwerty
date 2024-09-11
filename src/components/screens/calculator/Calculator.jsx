import EmptyState from "../../ui/EmptyState";
import CalcLayout from "./layout";

const Calculator = () => {
    return (
        <CalcLayout>
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </CalcLayout>
    );
}

export default Calculator;
