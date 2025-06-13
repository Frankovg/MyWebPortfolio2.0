'use client'

export default function Error({
  reset,
  error,
}: {
  reset: VoidFunction
  error: Error
}) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  )
}