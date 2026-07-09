import { SVGProps } from "react";

import SpriteIcon from "@/components/sprite-icon";
import { ABOUT_ICON_DIMENSIONS } from "@/icons/about-sprite-dimensions";

type AboutIconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

// Company/job/hobby icon backed by /about-sprite.svg. These logos have varied
// aspect ratios and their call sites rely on intrinsic size, so the outer <svg>
// defaults to the symbol's viewBox dimensions (overridable via props/className).
function AboutIcon({ name, ...props }: AboutIconProps) {
  const dims = ABOUT_ICON_DIMENSIONS[name];
  return (
    <SpriteIcon
      sprite="about-sprite.svg"
      name={name}
      width={dims?.width}
      height={dims?.height}
      {...props}
    />
  );
}

export default AboutIcon;
