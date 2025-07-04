import { Fragment } from "react";

import { BreadcrumbLinkObject } from "@/app/(admin)/admin/types/common";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadcrumbContainer({ links }: { links?: BreadcrumbLinkObject[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {links?.map((link) => (
          <Fragment key={link.name}>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              {link.href ? (
                <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{link.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbContainer;
