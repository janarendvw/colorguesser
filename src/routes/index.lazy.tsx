import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {



  return (
    <>

      <div className="w-screen h-screen flex flex-col items-center justify-center text-2xl">
        <div className='flex flex-col gap-8'>
          <h1 className='text-9xl font-black font-mono'>Farbe</h1>
          <div className="flex w-full justify-between font-bold font-mono">
            <Link to='/hexguesser' className='underline'>HexGuesser</Link>
            /
            <Link to='/hslguesser' className='underline'>HSLGuesser</Link>
          </div>
        </div>
      </div>
    </>
  )
}