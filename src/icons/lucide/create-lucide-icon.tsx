import { createElement, forwardRef, type SVGProps, type ForwardRefExoticComponent, type RefAttributes } from "react";

export type LucideIconNode = ReadonlyArray<readonly [tag: string, attrs: Record<string, string | number>]>;

export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const mergeClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

/**
 * Local replacement for lucide-react's icon factory. Replicates lucide's render
 * (default 24x24 viewBox, currentColor stroke) and its `size`/`color`/
 * `strokeWidth`/`absoluteStrokeWidth` props so existing call sites keep working.
 */
export function createLucideIcon(name: string, iconNode: LucideIconNode): LucideIcon {
  const Icon = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className,
        children,
        ...rest
      },
      ref,
    ) =>
      createElement(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
          className: mergeClasses("lucide", `lucide-${name}`, className),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => createElement(tag, { key: attrs.key, ...attrs })),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  );

  Icon.displayName = name;
  return Icon;
}
