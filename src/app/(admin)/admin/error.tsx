'use client'

export default function Error({
  error,
}: {
  error: Error
}) {
  return (
    <div className="max-w-[400px] h-full flex flex-col items-center justify-center mx-auto">
      <h1 className="my-2">Something went wrong...</h1>
      <pre className="text-warning">[{error.message}]</pre>
      <div className="w-full flex justify-center mt-4">
        Please try again
      </div>
    </div>
  )
}
