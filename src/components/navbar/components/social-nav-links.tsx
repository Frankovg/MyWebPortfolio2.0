import { SOCIAL_ICONS } from "@/lib/client-constants";

export function SocialNavLinks() {
  return (
    <li className="flex items-center gap-6 600:gap-1.5">
      {SOCIAL_ICONS.map((socialIcon, index) => (
        <a
          key={`${index}-${socialIcon.href}`}
          href={socialIcon.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center 600:bg-softGrey border border-solid border-whiteText rounded-full size-10.5 transition duration-300 ease-in hover:border-background"
        >
          <span className="absolute inset-0 bg-primary rounded-full transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100" />
          <socialIcon.icon />
        </a>
      ))}
    </li>
  );
}
