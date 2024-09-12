import AdminLayout from '../layout'
// import CalcCount from './CalcCount'
import AdminHeader from '../components/AdminHeader'
import UsersData from './UsersData';
// import EmptyState from '../../../../components/EmptyState'

const UsersPage = () => {
	return (
		<AdminLayout>
			<div className='hidden lg:block lg:pl-80 h-full'>
					<AdminHeader />
					<UsersData />
			</div>
		</AdminLayout>
	)
}

export default UsersPage;
