import { Metadata } from "next";
import { Suspense } from "react";

import { Hero } from "./components/hero";
import Loading from "./loading";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://franamoroso.com/app/home",
  },
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
    </Suspense>
  );
}
