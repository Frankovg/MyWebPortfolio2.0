import Link from "next/link"
import Logo from "./logo"
import MenuLink from "./menu-link"

const routes = [
  {
    label: 'Home',
    path: '/#home'
  },
  {
    label: 'Tech stack',
    path: '/#tech-stack'
  },
  {
    label: 'Projects',
    path: '/#projects'
  }
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full py-5 z-50 transition-transform duration-300 ease-in-out bg-background">
      <div className="flex items-center gap-8 w-full max-w-[1320px] mx-auto px-4">
        <Logo />
        <div className="flex items-center">
          <ul className="flex gap-10">
            {routes.map((route) => (
              <li key={route.path}>
                <Link href={route.path} className="text-lg" >
                  {route.label}
                </Link>
              </li>
            ))}
            <li>
              <MenuLink
                name="Downloads"
                linkStyles="text-lg font-normal p-0 h-fit text-white [&_svg]:w-4 [&_svg]:h-4"
              >
                Aqui van las descargas
              </MenuLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}