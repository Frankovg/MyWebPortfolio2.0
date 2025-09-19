export const LegalHeaders = ({ title, url }: { title: string, url: string }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg">{url}</p>
    </div>
  )
}
