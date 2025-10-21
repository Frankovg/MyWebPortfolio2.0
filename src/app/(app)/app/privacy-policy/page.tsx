export const dynamic = 'force-static';
export const revalidate = 3600;

import { Metadata } from "next";

import { LegalHeaders } from "@/components/legals-header";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import AcceptanceSection from "./components/acceptance-section";
import DataProtectionSection from "./components/data-protection-section";
import privacyPolicyContent from './privacy-policy-content.json';

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "https://franamoroso.com/app/privacy-policy",
  },
}

export default function PrivacyPolicy() {
  return (
    <Section id="privacy-policy" className="max-w-4xl mx-auto">
      <H4>{privacyPolicyContent.title}</H4>

      <div className="w-full max-w-[920px] mx-auto text-white space-y-8">
        <LegalHeaders title={privacyPolicyContent.websiteTitle} url={privacyPolicyContent.websiteUrl} />
        <DataProtectionSection />
        <AcceptanceSection />
      </div>
    </Section>
  );
}
