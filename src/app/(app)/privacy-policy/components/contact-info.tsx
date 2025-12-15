interface ContactInfoProps {
  contactInfo: {
    phone?: string;
    email: string;
  };
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-2">
      {contactInfo.phone && (
        <p><strong>Contact phone:</strong> {contactInfo.phone}</p>
      )}
      <p><strong>Email:</strong> {contactInfo.email}</p>
    </div>
  );
}
