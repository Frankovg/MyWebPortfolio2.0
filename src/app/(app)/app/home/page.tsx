import { Suspense } from "react";

import { Hero } from "./components/hero";
import Loading from "./loading";

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
    </Suspense>
  );
}
