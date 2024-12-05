import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import BreadcrumbContainer from './breadcrumb-container'

export type BreadcrumbLinkObject = {
  name: string
  href?: string
}

type MainHeaderProps = {
  breadcrumbLinks: BreadcrumbLinkObject[]
}

function MainHeader({ breadcrumbLinks }: MainHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-darkPrimary px-4">
      <SidebarTrigger className='-ml-1' />
      <Separator orientation="vertical" className="mr-2 h-5 w-0.5 bg-darkPrimary" />
      <BreadcrumbContainer links={breadcrumbLinks} />
    </header>
  )
}

export default MainHeader