import { ACADEMIC_BACKGROUND } from "../constants/constants";

function AcademicBackground() {
  return (
    <div className="w-full flex flex-wrap">
      {ACADEMIC_BACKGROUND.map((ab) => (
        <div key={ab.id} className="group w-full sm:w-1/2 940:w-1/3 1170:w-1/4 flex flex-col text-center gap-2.5 p-4 940:p-3 transition-colors duration-200 ease-in-out hover:bg-softGrey">
          <div className="flex flex-col max-sm:text-left text-center">
            <p className="text-xl font-semibold group-hover:text-secondary">{ab.degree}</p>
            <p className="text-base">{ab.institution}</p>
          </div>
          <p className="text-sm max-sm:text-left text-center">{`${ab.year}, ${ab.city}, ${ab.country}`}</p>
          {ab.description.map((description, index) => (
            <p key={index} className="text-am text-left font-normal tracking-wide">
              {description}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AcademicBackground;