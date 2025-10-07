import { getDownloadsContent, getUsersAdmin } from "@/lib/server-utils-admin";
import { getCategoriesForChart } from "@/lib/server-utils-public";

import { DownloadFiles } from "./download-files";
import { PortfolioChart } from "./portfolio-chart";
import { SampleAccountStatus } from "./sample-account-status";

export async function Dashboard() {
  const categories = await getCategoriesForChart();
  const users = await getUsersAdmin();
  const downloads = await getDownloadsContent();

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
