import Link from "next/link";

export const LabelLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <span>
      {" > "}
      <Link
        href={href}
        target="_blank"
        className="text-primary hover:underline"
      >
        {label}
      </Link>
    </span>
  );
};
