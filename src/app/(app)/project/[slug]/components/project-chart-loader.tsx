"use client";

import dynamic from "next/dynamic";

import type { Role } from "@/generated/prisma/client";

const ProjectChart = dynamic(() => import("./project-chart"), {
  ssr: false,
});

function ProjectChartLoader({ roles }: { roles: Role[] }) {
  return <ProjectChart roles={roles} />;
}

export default ProjectChartLoader;
