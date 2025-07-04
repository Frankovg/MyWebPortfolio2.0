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
