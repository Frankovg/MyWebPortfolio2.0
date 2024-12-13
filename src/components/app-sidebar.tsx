'use client'

import Link from "next/link"
import { useTransition } from "react"
import { usePathname } from "next/navigation"

//Icons
import { CloudDownload, Home, Users, KeyRound, LogOut, Briefcase } from "lucide-react"

//Sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

//Logos
import Logo from "./logo"
import Isologo from "./isologo"

//Actions
import { logOut } from "@/actions/actions"
import LogOutOverlay from "./logout-overlay"

type SidebarLogoutProps = {
  handleLogout: () => void,
  isPending: boolean
}

type SidebarHeaderWithLogoProps = {
  isExpanded: boolean
}

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Portfolio",
    url: "/admin/portfolio",
    icon: Briefcase,
  },
  {
    title: "Downloads",
    url: "/admin/downloads",
    icon: CloudDownload,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: Users,
  },
  {
    title: "Change Password",
    url: "/admin/change-password",
    icon: KeyRound,
  },
]

const SidebarNavigation = () => {
  const pathname = usePathname()
  
  return (
    <>
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  )
}

const SidebarHeaderWithLogo = ({ isExpanded }: SidebarHeaderWithLogoProps) => {
  const headerStyle = "flex items-center py-8"
  if (isExpanded) {
    return (
      <SidebarHeader className={headerStyle}>
        <div className="flex flex-col gap-2.5 items-center">
          <Logo />
          <h4 className="text-xs font-light">Content Management System</h4>
        </div>
      </SidebarHeader>
    )
  }

  return (
    <SidebarHeader className={headerStyle}>
      <Isologo />
    </SidebarHeader>
  )
}

const SidebarLogout = ({ handleLogout, isPending }: SidebarLogoutProps) => (
  <SidebarMenuButton
    disabled={isPending}
    onClick={handleLogout}
  >
    <LogOut />
    <span>Logout</span>
  </SidebarMenuButton>
)


export function AppSidebar() {
  const [isPending, startTransition] = useTransition()

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  const handleLogout = () => {
    startTransition(async () => {
      await logOut()
    })
  }

  return (
    <>
      {isPending && <LogOutOverlay />}
      <Sidebar collapsible="icon">
        <SidebarHeaderWithLogo
          isExpanded={state === 'expanded'}
        />
        <SidebarContent>
          <SidebarGroup>
            <SidebarNavigation />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarLogout
                handleLogout={handleLogout}
                isPending={isPending}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
