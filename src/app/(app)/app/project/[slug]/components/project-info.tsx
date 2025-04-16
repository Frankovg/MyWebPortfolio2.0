import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MONTHS } from "@/lib/constants";
import { ProjectShort } from "@/lib/types";

import HeadOfDescription from "./head-of-description";
import LinkButtons from "./link-buttons";
import LongDescription from "./long-description";

type ProjectInfoProps = {
  project?: ProjectShort;
};

function ProjectInfo({ project }: ProjectInfoProps) {
  if (!project) return null;

  const getFormattedDescription = (description: string) => {
    return description.replace(/\s{2,}/g, "\n").replace(/\n/g, "\n\n");
  };

  const getLinkButtons = (project: ProjectShort) => {
    const buttons = [];
    if (project.repository)
      buttons.push({ name: "Repository", url: project.repository });
    if (project.websiteUrl)
      buttons.push({ name: "Website", url: project.websiteUrl });
    return buttons;
  };

  const getHeaderData = (project: ProjectShort) => {
    const data = [];
    if (project.date) {
      const date = project.date;
      const monthYear = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
      data.push({ type: "Date:", name: monthYear });
    }
    if (project.company)
      data.push({
        type: "Developed at",
        name: project.company,
        url: project.companyUrl ?? undefined,
      });
    if (project.client)
      data.push({
        type: "Client:",
        name: project.client,
        url: project.clientUrl ?? undefined,
      });
    return data;
  };

  return (
    <Card className="border-none">
      <CardHeader className="pt-0 max-600:px-0">
        <HeadOfDescription data={getHeaderData(project)} />
      </CardHeader>
      <CardContent className="max-600:px-0">
        <LongDescription
          description={getFormattedDescription(project.description)}
        />
      </CardContent>
      <CardFooter className="flex gap-4 max-600:px-0">
        <LinkButtons data={getLinkButtons(project)} />
      </CardFooter>
    </Card>
  );
}

export default ProjectInfo;
