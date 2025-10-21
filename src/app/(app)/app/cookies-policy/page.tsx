export const dynamic = 'force-static';
export const revalidate = 3600;

import { Metadata } from "next";

import { LegalHeaders } from "@/components/legals-header";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import CookiesPolicyContent from "./components/cookies-policy-content";
import cookiesPolicyContent from './cookies-policy-content.json';

export const metadata: Metadata = {
  title: "Cookies Policy",
  alternates: {
    canonical: "https://franamoroso.com/app/cookies-policy",
  },
}

export default function CookiesPolicy() {
  return (
    <Section id="cookies-policy" className="max-w-4xl mx-auto">
      <H4>{cookiesPolicyContent.title}</H4>

      <div className="w-full max-w-[920px] mx-auto text-white space-y-8">
        <LegalHeaders title={cookiesPolicyContent.websiteTitle} url={cookiesPolicyContent.websiteUrl} />
        <CookiesPolicyContent />
      </div>
    </Section>
  );
}
