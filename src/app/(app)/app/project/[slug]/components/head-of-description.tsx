import Link from "next/link"

type HeadOfDescriptionProps = {
  data: {
    type: string
    name: string
    url?: string
  }[]
}

function HeadOfDescription({ data }: HeadOfDescriptionProps) {
  return (
    <div className="w-fit">
      {data.map((item, index) => {
        if (!!item.url) {
          return (
            <Link
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>
                {item.type} <span className="font-bold hover:underline text-white">{item.name}</span>
              </p>
            </Link>
          )
        }

        return (
          <p key={index}>
            {item.type} <span className="font-bold">{item.name}</span>
          </p>
        )
      })}
    </div>
  )
}

export default HeadOfDescription