import { useStore } from "../stores/app-store"

function Highscore() {
    const { highScore } = useStore()
  return (
    <div className="absolute left-2 bottom-2 font-bold text-2xl text-white">
    Highscore: {highScore}
  </div>
  )
}

export default Highscore