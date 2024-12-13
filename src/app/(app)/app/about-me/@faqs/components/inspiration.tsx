import { INSPIRATION } from "../constants/constants"

function Inspiration() {
  return (
    <div className="w-full h-auto space-y-2">
      {INSPIRATION.map((paragraph, index) => (
        <p key={index} className="max-w-inspiration tracking-wide text-am px-2">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default Inspiration