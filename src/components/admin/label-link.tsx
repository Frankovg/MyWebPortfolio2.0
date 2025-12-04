export const LabelLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <span>
      {" > "}
      <a
        href={href}
        target="_blank"
        className="text-primary hover:underline"
      >
        {label}
      </a>
    </span>
  );
};
