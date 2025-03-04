import { Suspense } from "react";
import MainHeader from "../components/main-header";
import Loading from "./loading";
import H1Main from "@/components/h1-main";

function Admin() {
  const breadcrumbLinks = [
    {
      name: "Portfolio",
    },
  ];

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <section className="w-full px-20 py-10 space-y-6">
          <H1Main>Portfolio</H1Main>
        </section>
      </Suspense>
    </>
  );
}

export default Admin;
