export const dynamic = 'force-static';
export const revalidate = 3600;

import Section from "@/components/section";
import H4 from "@/components/primitives/h4";
import cookiesPolicyContent from './cookies-policy-content.json';

export default function CookiesPolicy() {
  return (
    <Section id="privacy-policy" className="max-w-4xl mx-auto">
      <H4>{cookiesPolicyContent.title}</H4>

      <div className="w-full max-w-[920px] mx-auto text-white space-y-8">

      </div>
    </Section>
  );
}
