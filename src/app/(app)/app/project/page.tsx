import { redirect } from "next/navigation";

import { getFirstSoftwareProject } from "@/lib/server-utils-public";

//TODO: make this dynamic pages as static pages
export default async function Project() {
  //TODO: add zod vaidations to every fetch
  const project = await getFirstSoftwareProject();

  if (!project) redirect("/app/home");

  redirect(`/app/project/${project?.slug}`);
}
