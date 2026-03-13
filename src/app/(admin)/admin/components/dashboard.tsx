import dynamic from "next/dynamic";

import { getDownloadsContent, getUsersAdmin } from "@/lib/server-utils-admin";
import { getCategoriesForChart } from "@/lib/server-utils-public";

import { DownloadFiles } from "./download-files";
import { SampleAccountStatus } from "./sample-account-status";

const PortfolioChart = dynamic(() => import("./portfolio-chart").then(mod => ({ default: mod.PortfolioChart })));

export async function Dashboard() {
  const [categories, users, downloads] = await Promise.all([
    getCategoriesForChart(),
    getUsersAdmin(),
    getDownloadsContent(),
  ]);

  if (!categories || !users || !downloads) {
    throw new Error("Error fetching the dashboard.")
  }

  const sampleAccountInfo = users.find((user) => !user.isAdmin);

  return (
    <div className="flex flex-col-reverse max-1170:gap-4 shrink 1170:flex-row">
      <div className="flex-1 1170:p-2">
        <PortfolioChart categories={categories} />
      </div>
      <div className="flex-1 flex flex-col gap-4 items-center 1170:p-2">
        {sampleAccountInfo && (
          <SampleAccountStatus account={sampleAccountInfo} />
        )}
        <DownloadFiles downloads={downloads} />
      </div>
    </div>
  );
}
