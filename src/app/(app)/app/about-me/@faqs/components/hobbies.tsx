import { HOBBIES } from "../constants/constants"

function Hobbies() {
  return (
    <div className="w-full flex flex-wrap">
      {HOBBIES.map((hobby) => (
        <div key={hobby.id} className="group w-full max-w-hobby mx-auto flex flex-col items-center gap-2.5 p-4 940:p-3 transition-colors duration-200 ease-in-out hover:bg-softGrey">
          <hobby.icon className="group-hover:fill-primary group-hover:scale-105" />
          <p className="text-am text-left font-normal tracking-wide">
            {hobby.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Hobbies