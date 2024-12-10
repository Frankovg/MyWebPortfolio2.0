import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import BreadcrumbContainer from './breadcrumb-container'
import { checkAuth } from '@/lib/server-utils'
import SampleMessage from './sample-message'

export type BreadcrumbLinkObject = {
  name: string
  href?: string
}

type MainHeaderProps = {
  breadcrumbLinks: BreadcrumbLinkObject[]
}

async function MainHeader({ breadcrumbLinks }: MainHeaderProps) {
  const session = await checkAuth()
  const user = session?.user

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-darkPrimary px-4">
        <SidebarTrigger className='-ml-1' />
        <Separator orientation="vertical" className="mr-2 h-5 w-0.5 bg-darkPrimary" />
        <BreadcrumbContainer links={breadcrumbLinks} />
      </header>
      {!user?.isAdmin &&
        <SampleMessage />
      }
    </>
  )
}

export default MainHeader