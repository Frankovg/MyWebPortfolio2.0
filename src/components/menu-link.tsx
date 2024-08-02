import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"

type MenuLinkProps = {
  name: string,
  children: React.ReactNode
  linkStyles?: string,
}

export default function MenuLink({ name, linkStyles, children }: MenuLinkProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={linkStyles} >
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>{children}</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}