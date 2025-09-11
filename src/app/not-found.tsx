import * as React from "react";

import { ErrorPage } from "@/components/404";


export const dynamic = 'force-dynamic'; // Force dynamic rendering for fresh data

export default async function NotFoundProduct() {
  return <ErrorPage />;
}
