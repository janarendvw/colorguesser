import "./App.css";
import HexInput from "./components/color-input/HexInput";
import { useStore } from "./stores/app-store";
import ScoreCard from "./components/ScoreCard";

function App() {
  const { attempts, resetAttempts, highScore } = useStore();
  const {generatedColor, guesssedColor} = useStore();


  return (
    <>
      <div className="absolute left-2 bottom-2 font-bold text-2xl text-white">
        Highscore: {highScore}
      </div>
      <main
        className="w-screen h-screen flex items-center justify-center flex-col"
        style={{ background: generatedColor }}
      >
        <div className="h-full flex flex-col justify-evenly">
          <h1 className="text-6xl text-white bg-clip-text font-black tracking-tight">
            Guess the color
          </h1>
          <div className="flex flex-col gap-2">
            {attempts.length < 5 ? (
              <>
                <h2 className="text-2xl text-white/75">
                  Attempt: {attempts.length + 1}/5
                </h2>
                <HexInput/>
                <p style={{opacity: guesssedColor.includes(null) ? '0.4' : '1'}} className="text-white">
                  &#x21AA; Press{" "}
                  <b className="bg-white/20 px-2">Enter</b> to submit
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-8 text-center">
              <h2 className="text-4xl font-bold text-white">
                Game Over
              </h2>
              <h3 className="text-2xl text-white">
                Your score is: <b className="text-4xl">{attempts.reduce((acc, curr) => acc + curr.score, 0)}</b>
              </h3>
              <button
                onClick={() => resetAttempts()}
                className="bg-black text-white tracking-wide font-bold p-4 rounded-md"
              >
                Play Again
              </button>
              </div>
            )}
          </div>
          <div>
          <ScoreCard />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
