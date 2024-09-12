import EmptyState from "../../ui/EmptyState";
import AdminLayout from "./layout";

const Calculator = () => {
    return (
        <AdminLayout>
            <div className='hidden lg:block lg:pl-80 h-full'>
                <EmptyState />
            </div>
        </AdminLayout>
    );
}

export default Calculator;
