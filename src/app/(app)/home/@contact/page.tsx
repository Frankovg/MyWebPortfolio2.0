import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import ContactForm from "./components/contact-form";

function Contact() {
  return (
    <Section id="contact" className="pt-24">
      <H4>Get in Touch</H4>
      <ContactForm />
    </Section>
  );
}

export default Contact;
