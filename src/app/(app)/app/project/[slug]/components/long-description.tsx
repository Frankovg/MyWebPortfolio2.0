type LongDescriptionProps = {
  description: string
}

function LongDescription({ description }: LongDescriptionProps) {
  return (
    <p className="whitespace-pre-line tracking-wide leading-normal italic max-w-[500px]">{description}</p>
  )
}

export default LongDescription