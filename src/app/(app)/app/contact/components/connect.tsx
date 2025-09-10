import { GithubIcon, LinkedInIcon } from "@/icons/social"
import { MailIcon, MapIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import Link from "next/link"

type ConnectItemProps = {
  href: string,
  title: string,
  name: string,
  icon: React.ReactNode
}

const ConnectItem = ({ href, title, name, icon }: ConnectItemProps) => {
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

export const Connect = () => {
  return (
    <div className="p-2.5 w-full">
      <h2 className="text-xl font-semibold">Connect with me</h2>
      <ConnectItem
        href={process.env.GITHUB_URL ?? "#"}
        name="Frankovg"
        title="Personal Github"
        icon={(<GithubIcon className="h-6 w-6" />)}
      />
      <ConnectItem
        href={process.env.GITHUB_URL_PRO ?? "#"}
        name="FranF3"
        title="Professional Github"
        icon={(<GithubIcon className="h-6 w-6" />)}
      />
      <ConnectItem
        href={process.env.LINKEDIN_URL ?? "#"}
        name="Franco Gabriel (Fran) Amoroso"
        title="LinkedIn"
        icon={(<LinkedInIcon className="h-6 w-6" />)}
      />
      <div className="border-b border-white w-full mt-6" />
      <h2 className="text-xl font-semibold mt-6">Contact information</h2>
      <ConnectItem
        href={`tel:${process.env.CONTACT_NUMBER ?? "#"}`}
        name={process.env.CONTACT_NUMBER ?? ""}
        title="Phone"
        icon={(<PhoneIcon className="h-6 w-6 text-white" />)}
      />
      <ConnectItem
        href={`mailto:${process.env.CONTACT_EMAIL ?? "#"}`}
        name={process.env.CONTACT_EMAIL ?? ""}
        title="Email"
        icon={(<MailIcon className="h-6 w-6 text-white" />)}
      />
      <ConnectItem
        href="#"
        name={process.env.CONTACT_LOCATION ?? ""}
        title="Location"
        icon={(<MapPinIcon className="h-6 w-6 text-white" />)}
      />
    </div>
  )
}
