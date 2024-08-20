import Link from 'next/link'
import Image from 'next/image'

//Images
import downloadCv from '/public/download-cv.webp'
import downloadPortfolio from '/public/download-portfolio.webp'

const downloads = [
  {
    name: "Curriculum Vitae",
    href: "https://drive.google.com/file/d/1IOwsxqChdt0bWAtnU5dXfpqcK6L6ZKLG/view?usp=sharing",
    img: downloadCv
  },
  {
    name: "Portfolio",
    href: "https://drive.google.com/file/d/14Hjmod8Uf0y7DHNt--0mgk51Y0WFbeCk/view?usp=sharing",
    img: downloadPortfolio
  },
]

function DownloadLinks() {
  return (
    <>
      {downloads.map((download) => (
        <Link href={download.href} target="_blank" className="group relative overflow-hidden" key={download.name}>
          <Image
            src={download.img}
            alt={download.name}
            width={200}
            height={133}
            className="w-[200px] h-[133px] object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] animate-shiny"></div>
        </Link>
      ))}
    </>
  )
}

export default DownloadLinks