import { Suspense } from "react";

import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import Loading from "./loading";
import ContactForm from "../home/@contact/components/contact-form";
import { Connect } from "./components/connect";

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
