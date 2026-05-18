import { Metadata } from "next";
import { Suspense } from "react";

import { Hero } from "./components/hero";
import Loading from "./loading";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://franamoroso.com/home",
  },
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
    </Suspense>
  );
}
