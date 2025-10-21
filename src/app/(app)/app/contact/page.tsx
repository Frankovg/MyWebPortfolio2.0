import { Metadata } from "next";
import { Suspense } from "react";

import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import ContactForm from "../home/@contact/components/contact-form";

import { Connect } from "./components/connect";
import Loading from "./loading";

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fran Amoroso. Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you.",
  alternates: {
    canonical: "https://franamoroso.com/app/contact",
  },
}

export default function AboutMe() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full flex flex-col-reverse md:flex-row">
        <Section id="connect">
          <H4 className="hidden md:block">Connect</H4>
          <Connect />
        </Section>
        <Section id="contact" >
          <H4>Get in Touch</H4>
          <ContactForm />
        </Section>
      </div>
    </Suspense>
  );
}
