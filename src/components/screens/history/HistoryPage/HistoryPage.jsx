// import CalcCount from './CalcCount'
import HistoryLayout from '../layout'
import HistoryHeader from './components/HistoryHeader'
import HistoryData from './components/HistoryData'
// import EmptyState from '../../../../components/EmptyState'

const HistoryPage = () => {
	return (
		<HistoryLayout>
			<div className='hidden lg:block lg:pl-80 h-full'>
					<HistoryHeader />
					<HistoryData />
			</div>
		</HistoryLayout>
	)
}

export default HistoryPage
