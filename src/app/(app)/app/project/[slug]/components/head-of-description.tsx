type HeadOfDescriptionProps = {
  data: {
    name: string
    url: string
  }[]
}

function HeadOfDescription({ data }: HeadOfDescriptionProps) {
  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>
          {item.name} <span className="font-bold">{item.url}</span>
        </p>
      ))}
    </div>
  )
}

export default HeadOfDescription