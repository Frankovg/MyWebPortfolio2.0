import { getCategoriesForChart } from "@/lib/server-utils-public";
import { PortfolioChart } from "./portfolio-chart";
import { SampleAccountStatus } from "./sample-account-status";
import { getDownloadsContent, getUsersAdmin } from "@/lib/server-utils-admin";
import { DownloadFiles } from "./download-files";

export async function Dashboard({ isAdmin = false }: { isAdmin?: boolean }) {
  const categories = await getCategoriesForChart();
  const users = await getUsersAdmin();
  const sampleAccountInfo = users.find((user) => !user.isAdmin);
  const downloads = await getDownloadsContent();

  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 p-2">
        <PortfolioChart categories={categories} />
      </div>
      <div className="w-1/2 flex flex-col gap-4 items-center p-2 h-max">
        {sampleAccountInfo && (
          <SampleAccountStatus account={sampleAccountInfo} />
        )}
        <DownloadFiles downloads={downloads} />
      </div>
    </div>
  );
}
