import { getUsers } from "@/lib/server-utils"
import MainHeader from "../components/main-header"
import AccountsTable from "./components/accounts-table"
import UserManagementProvider from "./context/user-management-provider"

async function UserManagement() {
  const breadcrumbLinks = [
    {
      name: 'User Management',
    }
  ]

  const users = await getUsers()

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <main className='w-full px-20 py-10 space-y-6'>
        <h1 className="text-xl font-semibold">User Management</h1>
        <UserManagementProvider data={users}>
          <AccountsTable />
        </UserManagementProvider>
      </main>
    </>
  )
}

export default UserManagement