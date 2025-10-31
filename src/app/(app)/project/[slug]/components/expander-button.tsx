import { Expand } from "lucide-react"

type ExpanderButtonProps = {
  onClick: VoidFunction
}

function ExpanderButton({ onClick }: ExpanderButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute hover:cursor-pointer top-2 right-2 z-10 p-1.5 rounded-md bg-black/65"
    >
      <Expand className="size-4" />
    </button>
  )
}

export default ExpanderButton
