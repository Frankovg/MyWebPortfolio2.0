import Link from "next/link";

import AnimatedArrowRight from "@/components/primitives/animated-arrow-right";

function ToLinkedIn() {
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  return (
    <div className="w-full h-auto space-y-2 px-2">
      <Link
        href={linkedinUrl ?? ""}
        target="_blank"
        className="group flex items-center w-fit"
      >
        <p className="text-lg font-semibold">Go to LinkedIn</p>
        <AnimatedArrowRight />
      </Link>
      <p>Don&apos;t be shy and send me a contact request 😉.</p>
    </div>
  );
}

export default ToLinkedIn;
