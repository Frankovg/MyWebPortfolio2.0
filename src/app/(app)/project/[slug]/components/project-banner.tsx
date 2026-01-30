import BannerContainer from "@/components/banner-container";
import ImageWithFallback from "@/components/primitives/image-with-fallback";
import { FALLBACK_IMG } from "@/lib/constants";

function ProjectBanner({ image }: { image: string }) {
  return (
    <BannerContainer className="max-600:hidden">
      <ImageWithFallback
        className="object-cover md:object-contain w-auto md:w-full h-full md:h-auto"
        src={image}
        fallbackSrc={FALLBACK_IMG}
        alt="Project banner"
        width={0}
        height={0}
        sizes={"100%"}
        quality={50}
        preload
      />
    </BannerContainer>
  );
}

export default ProjectBanner;
