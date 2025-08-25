import DownloadLinks from "../download-links";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

type MenuLinkProps = {
  name: string;
  linkStyles?: string;
};

export default function MenuLink({ name, linkStyles }: MenuLinkProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={linkStyles}>
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenu>
              <DownloadLinks />
            </NavigationMenu>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator className="bg-softGrey h-1.5 transition-all duration-300 ease-in w-0 hover:w-full" />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
