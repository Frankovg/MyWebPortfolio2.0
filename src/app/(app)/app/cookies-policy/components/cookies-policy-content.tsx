import cookiesPolicyContent from '../cookies-policy-content.json';

export default function CookiesPolicyContent() {
  const { subsections } = cookiesPolicyContent.sections;

  return (
    <section className="space-y-6">
      {/* What are cookies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {subsections.whatAreCookies.title}
        </h3>
        {subsections.whatAreCookies.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* How we use cookies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {subsections.howWeUseCookies.title}
        </h3>
        <p className="text-base leading-relaxed">
          {subsections.howWeUseCookies.content}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base">
          {subsections.howWeUseCookies.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-base leading-relaxed font-medium">
          {subsections.howWeUseCookies.conclusion}
        </p>
      </div>

      {/* First-party cookies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {subsections.fistPartyCookies.title}
        </h3>
        <p className="text-base leading-relaxed">
          {subsections.fistPartyCookies.content}
        </p>
      </div>

      {/* Third-party cookies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {subsections.thirdPartyCookies.title}
        </h3>
        <p className="text-base leading-relaxed">
          {subsections.thirdPartyCookies.content}
        </p>
      </div>

      {/* Disabling cookies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {subsections.disablingCookies.title}
        </h3>
        <p className="text-base leading-relaxed">
          {subsections.disablingCookies.content}
        </p>
      </div>

      {/* Legend Section */}
      <div className="pt-8">
        <p className="text-base leading-relaxed text-gray-400">
          {subsections.legend}
        </p>
      </div>
    </section>
  );
}
