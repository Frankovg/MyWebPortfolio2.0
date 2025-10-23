import Link from "next/link"

type ConnectItemProps = {
  href: string,
  title: string,
  name: string,
  icon: React.ReactNode
}

export const ConnectItem = ({ href, title, name, icon }: ConnectItemProps) => {
  return (
    <div className="w-fit py-2">
      <Link
        href={href}
        target="_blank"
      >
        <div className="group flex items-center gap-3">
          {icon}
          <div>
            <p className="font-light leading-4 group-hover:text-white">{title}</p>
            <p className="text-lg leading-4 group-hover:text-white">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
