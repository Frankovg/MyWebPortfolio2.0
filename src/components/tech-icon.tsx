import { SVGProps } from "react";

import SpriteIcon from "@/components/sprite-icon";

type TechIconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

// Tech-stack icon backed by /techs-sprite.svg. Size is driven by className at
// the call sites, so no intrinsic width/height is set here.
function TechIcon({ name, ...props }: TechIconProps) {
  return <SpriteIcon sprite="techs-sprite.svg" name={name} {...props} />;
}

export default TechIcon;
