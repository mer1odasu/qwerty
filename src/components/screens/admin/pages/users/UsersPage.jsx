import React from 'react'
import Layout from '../../../../layout/Layout'
import AdminList from '../../components/AdminList'
import AdminHeader from '../../components/AdminHeader'
import UserTable from './UserTable'

const UsersPage = () => {
	return (
		<Layout>
			<div>
				<AdminList />
				<div className="hidden lg:block lg:pl-80 h-full">
          <AdminHeader />
					<UserTable />
        </div>
			</div>
		</Layout>
	)
}

export default UsersPage
