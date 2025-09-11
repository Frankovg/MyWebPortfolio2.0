import { redirect } from "next/navigation";

import { getFirstSoftwareProject } from "@/lib/server-utils-public";

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Project() {
  //TODO: add zod vaidations to every fetch
  const project = await getFirstSoftwareProject();

  if (!project) redirect("/app/home");

  redirect(`/app/project/${project?.slug}`);
}
