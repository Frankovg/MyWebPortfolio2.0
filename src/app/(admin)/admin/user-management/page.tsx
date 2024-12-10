import { getUsers } from "@/lib/server-utils"
import MainHeader from "../components/main-header"
import AccountsTable from "./components/accounts-table"
import { columns } from "./components/accounts-columns"

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
      <main className='w-full px-20 py-10'>
        <h1 className="text-xl font-semibold">User Management</h1>
        <AccountsTable columns={columns} data={users} />
      </main>
    </>
  )
}

export default UserManagement