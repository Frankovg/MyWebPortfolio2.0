'use client'

import Link from "next/link"
import { useTransition } from "react"

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Portfolio",
    url: "#",
    icon: Briefcase,
    isActive: false,
  },
  {
    title: "Downloads",
    url: "#",
    icon: CloudDownload,
  },
  {
    title: "User Management",
    url: "#",
    icon: Users,
  },
  {
    title: "Change Password",
    url: "#",
    icon: KeyRound,
  },
]

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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center py-8">
        {state === 'expanded' ? (
          <div className="flex flex-col gap-2.5 items-center">
            <Logo />
            <h4 className="text-xs font-light">Content Management System</h4>
          </div>
        ) : (
          <Isologo />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled={isPending}
              onClick={async () => {
                startTransition(async () => {
                  await logOut()
                })
              }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
