import { Separator } from "@radix-ui/react-separator";

import { BreadcrumbLinkObject } from "@/app/(admin)/admin/types/common";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { checkAuth } from "@/lib/check-auth";

import BreadcrumbContainer from "./breadcrumb-container";
import SampleMessage from "./sample-message";

type MainHeaderProps = {
  breadcrumbLinks?: BreadcrumbLinkObject[];
};

async function MainHeader({ breadcrumbLinks }: MainHeaderProps) {
  const session = await checkAuth();
  const user = session?.user;

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-background border-b border-darkPrimary px-4 overflow-hidden">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-5 w-0.5 bg-darkPrimary"
        />
        <BreadcrumbContainer links={breadcrumbLinks} />
      </header>
      {!user?.isAdmin && <SampleMessage />}
    </>
  );
}

export default MainHeader;
