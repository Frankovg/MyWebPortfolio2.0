'use client'


export default function Error({
  error,
}: {
  error: Error
}) {
  return (
    <div className="my-20 p-8 border border-white rounded-sm">
      <h1>Something went wrong...</h1>
      <pre className="text-warning">[{error.message}]</pre>
      <div className="w-full flex justify-center mt-4">
        Please try again
      </div>
    </div>
  )
}
