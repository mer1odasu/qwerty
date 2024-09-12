import AdminLayout from '../layout'
// import CalcCount from './CalcCount'
import AdminHeader from '../components/AdminHeader'
// import EmptyState from '../../../../components/EmptyState'

const UsersPage = () => {
	return (
		<AdminLayout>
			<div className='hidden lg:block lg:pl-80 h-full'>
					<AdminHeader />
					{/* <CalcCount /> */}
			</div>
		</AdminLayout>
	)
}

export default UsersPage;
