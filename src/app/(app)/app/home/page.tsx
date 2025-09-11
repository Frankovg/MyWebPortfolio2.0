import { Suspense } from "react";

import { Hero } from "./components/hero";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
    </Suspense>
  );
}
