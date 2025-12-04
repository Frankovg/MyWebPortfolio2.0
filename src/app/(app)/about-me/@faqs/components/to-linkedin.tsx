import AnimatedArrowRight from "@/components/primitives/animated-arrow-right";

function ToLinkedIn() {
  const linkedinUrl = process.env.LINKEDIN_URL;
  return (
    <div className="w-full h-auto space-y-2 px-2">
      <a
        href={linkedinUrl ?? ""}
        target="_blank"
        className="group flex items-center w-fit"
      >
        <p className="text-lg font-semibold">Go to LinkedIn</p>
        <AnimatedArrowRight />
      </a>
      <p>Don&apos;t be shy and send me a contact request 😉.</p>
    </div>
  );
}

export default ToLinkedIn;
