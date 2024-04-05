import { useEffect } from 'react'
import { useStore } from '../stores/app-store'

function ScoreCard() {
    const { attempts, setHighScore } = useStore()

    useEffect(() => {
        const highScore = attempts.reduce((acc, curr) => acc + curr.score, 0)
        const savedHighScore = localStorage.getItem("highscore")

        if (highScore > (savedHighScore ? parseInt(savedHighScore) : 0)) {
            localStorage.setItem("highscore", highScore.toString())
            setHighScore(highScore)
        }
    }
    , [attempts, setHighScore])

  return (

        <div className="flex p-4 flex-col font-mono gap-2 rounded-md bg-white/20">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className=" flex items-center justify-between w-full"
              >
                <p className="text-white font-semibold">
                  <span className="text-2xl">
                    +{attempt.score}
                    {attempt.score > 450 && "🔥"}
                  </span>
                </p>
                <div className="flex text-white font-mono">
                  <div
                    className="p-2 rounded-l-md"
                    style={{ background: attempt.guesssedColor }}
                  >
                    {attempt.guesssedColor}
                  </div>
                  <div
                    className="p-2 rounded-r-md"
                    style={{ background: attempt.generatedColor }}
                  >
                    {attempt.generatedColor}
                  </div>
                </div>
              </div>
            ))}
          <div className="h-px w-full bg-white/50"></div>
          <h2 className="text-xl text-white font-mono font-bold">
            Total score: {attempts.reduce((acc, curr) => acc + curr.score, 0)}
          </h2>
        </div>
    
  )
}

export default ScoreCard