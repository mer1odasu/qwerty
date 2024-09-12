import CalcCount from './CalcCount'
import CalculatorHeader from './components/CalculatorHeader'
import Layout from '../../layout/Layout'
import CalculatorList from './components/CalculatorList' 
const CalcPage = () => {
	return (
		<Layout>
			<CalculatorList />
			<div className='hidden lg:block lg:pl-80 h-full'>
					<CalculatorHeader />
					<CalcCount />
			</div>
		</Layout>
	)
}

export default CalcPage
