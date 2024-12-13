function SampleMessage() {
  return (
    <div className='w-full p-2'>
      <div className='p-8 rounded bg-darkPrimary flex items-stretch'>
        <div className='bg-secondary w-4 mr-4' />
        <div>
          <h2 className="text-lg font-semibold mb-2">This is a sample version of the platform</h2>
          <p className='max-w-xl mb-2'>
            Any actions you take here are only for demonstration purposes and it will not affect the actual database.
          </p>
          <p className='max-w-xl'>
            Feel free to explore and test the features without concern about making permanent changes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SampleMessage