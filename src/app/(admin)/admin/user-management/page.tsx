import MainHeader from "../components/main-header"

function UserManagement() {
  const breadcrumbLinks = [
    {
      name: 'User Management',
    }
  ]

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <main className='w-full px-20 py-10'>
        <h1 className="text-xl font-semibold">User Management</h1>
      </main>
    </>
  )
}

export default UserManagement