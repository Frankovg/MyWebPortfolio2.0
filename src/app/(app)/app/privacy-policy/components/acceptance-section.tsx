import privacyPolicyContent from '../privacy-policy-content.json';

export default function AcceptanceSection() {
  const { acceptance } = privacyPolicyContent.sections;

  return (
    <section className="space-y-6 border-t border-gray-600 pt-8">
      <h2 className="text-xl font-semibold">{acceptance.title}</h2>
      {acceptance.content.map((paragraph, index) => (
        <p
          key={index}
          className={`text-base leading-relaxed ${index === acceptance.content.length - 1 ? 'text-gray-400' : ''
            }`}
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
