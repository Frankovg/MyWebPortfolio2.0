import { HOBBIES } from "../constants/constants"

function Hobbies() {
  return (
    <div className="w-full flex flex-wrap">
      {HOBBIES.map((hobby) => (
        <div key={hobby.id} className="group w-full max-w-[360px] mx-auto flex flex-col items-center gap-2.5 p-4 min-[940px]:p-3 transition-colors duration-200 ease-in-out hover:bg-softGrey">
          <hobby.icon className="group-hover:fill-primary group-hover:scale-105" />
          <p className="text-[0.9rem] text-left font-normal tracking-wide leading-[1.4rem]">
            {hobby.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Hobbies