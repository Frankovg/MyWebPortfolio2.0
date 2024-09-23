import Image from "next/image";

type ProjectCardProps = {
  project: {
    image: string,
    title: string,
    description: string,
  }
}

function ProjectCard({ project }: ProjectCardProps) {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Image className="w-full" src={project.image} alt={project.title} width={0} height={0} sizes={'100%'} quality={50} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{project.title}</div>
        <p className="text-gray-700 text-base">{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectCard