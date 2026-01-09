import privacyPolicyContent from '../privacy-policy-content.json';

import ContactInfo from './contact-info';

export default function DataProtectionSection() {
  const { dataProtection } = privacyPolicyContent.sections;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">
        {dataProtection.title}
      </h2>
      <p className="text-base leading-relaxed">
        {dataProtection.intro}
      </p>

      {/* Laws Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.laws.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.laws.content}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base">
          {dataProtection.subsections.laws.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Data Controller Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.dataController.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.dataController.content}
        </p>
        <ContactInfo contactInfo={dataProtection.subsections.dataController.contactInfo} />
      </div>

      {/* Data Registry Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.dataRegistry.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.dataRegistry.content}
        </p>
      </div>

      {/* Principles Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.principles.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.principles.content}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base">
          {dataProtection.subsections.principles.items.map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Data Categories Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.dataCategories.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.dataCategories.content}
        </p>
      </div>

      {/* Legal Basis Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.legalBasis.title}</h3>
        {dataProtection.subsections.legalBasis.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Purposes Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.purposes.title}</h3>
        {dataProtection.subsections.purposes.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Retention Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.retention.title}</h3>
        {dataProtection.subsections.retention.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Recipients Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.recipients.title}</h3>
        {dataProtection.subsections.recipients.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Minors Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.minors.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.minors.content}
        </p>
      </div>

      {/* Security Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.security.title}</h3>
        {dataProtection.subsections.security.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Rights Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.rights.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.rights.intro}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base">
          {dataProtection.subsections.rights.items.map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>

        <p className="text-base leading-relaxed">
          {dataProtection.subsections.rights.exerciseRights.intro}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base">
          {dataProtection.subsections.rights.exerciseRights.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>

        <p className="text-base leading-relaxed">
          This request and any other attached document may be sent to the following address and/or email:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
          <p><strong>Email:</strong> {dataProtection.subsections.rights.exerciseRights.contactInfo.email}</p>
        </div>
      </div>

      {/* Third Party Links Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.thirdPartyLinks.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.thirdPartyLinks.content}
        </p>
      </div>

      {/* Complaints Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dataProtection.subsections.complaints.title}</h3>
        <p className="text-base leading-relaxed">
          {dataProtection.subsections.complaints.content}
        </p>
      </div>
    </section>
  );
}
