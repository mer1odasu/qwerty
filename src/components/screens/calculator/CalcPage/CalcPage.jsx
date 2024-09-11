import CalcLayout from '../layout'
import CalcCount from './CalcCount'
import CalculatorHeader from '../components/CalculatorHeader'
// import EmptyState from '../../../../components/EmptyState'

const CalcPage = () => {
	return (
		<CalcLayout>
			<div className='hidden lg:block lg:pl-80 h-full'>
					<CalculatorHeader />
					<CalcCount />
			</div>
		</CalcLayout>
	)
}

export default CalcPage
