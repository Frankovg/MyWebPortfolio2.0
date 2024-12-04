const LogOutOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background z-50 opacity-[0.98] animate-fadeIn">
      <div className="w-full h-full flex items-center justify-center text-whiteText">
        <p className="text-5xl font-semibold animate-slideUp">
          Good Bye!
        </p>
      </div>
    </div>
  )
}

export default LogOutOverlay