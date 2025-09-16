import privacyPolicyContent from '../privacy-policy-content.json';

export default function PrivacyPolicyHeader() {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">{privacyPolicyContent.websiteTitle}</h2>
      <p className="text-lg">{privacyPolicyContent.websiteUrl}</p>
    </div>
  );
}
