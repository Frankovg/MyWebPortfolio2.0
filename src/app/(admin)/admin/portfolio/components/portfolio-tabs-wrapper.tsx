"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs } from "@/components/ui/tabs";

function PortfolioTabsWrapper({
  defaultCategory,
  children,
}: {
  defaultCategory: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams ?? undefined);
    newParams.set("category", value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="w-full ">
      <Tabs
        defaultValue={defaultCategory}
        className="w-full"
        onValueChange={handleValueChange}
      >
        {children}
      </Tabs>
    </div>
  );
}

export default PortfolioTabsWrapper;
