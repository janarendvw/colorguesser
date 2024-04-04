import { useEffect, useState } from "react";
import "./App.css";
import generateColor from "./utils/color-generator";
import validateColor from "./utils/color-validator";

type Attempt = {
  score: number;
  guesssedColor: string;
  generatedColor: string;
};

function App() {
  const [value, setValue] = useState("#");
  const [color, setColor] = useState(generateColor());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [highScore, setHighScore] = useState(0);

  const updateColorGuessValue = (inputValue: string) => {
    if (inputValue.length < 1) {
      return;
    }
    value.includes("#") ? setValue(inputValue) : setValue("#" + inputValue);
  };

  useEffect(() => {
    const localHighScore = localStorage.getItem("highScore");
    if (localHighScore) {
      setHighScore(parseInt(localHighScore));
    }
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
  }, [score, highScore]);

  const handleSubmit = () => {
    if (attempts.length >= 5) {
      return;
    }
    const calculatedScore = validateColor(color, value);
    setAttempts((prevAttempts) => [
      ...prevAttempts,
      { score: calculatedScore, guesssedColor: value, generatedColor: color },
    ]);
    setScore((prevScore) => prevScore + calculatedScore); // Using functional form of setScore
    setTimeout(() => {
      setValue("#");
      setColor(generateColor());
    }, 1);
  };

  return (
    <>
      <div className="absolute left-2 bottom-2 font-bold text-2xl text-white">
        Highscore: {highScore}
      </div>
      <main
        className="w-screen h-screen flex items-center justify-center flex-col"
        style={{ background: color }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl text-white bg-clip-text font-black tracking-tight mb-8">
            Guess the color
          </h1>
          {attempts.length < 5 ? (
            <>
              <h2 className="text-2xl text-white/75">
                Attempt: {attempts.length + 1}/5
              </h2>

            </>
          ) : (
            <button
              onClick={() => setAttempts([])}
              className="bg-black text-white tracking-wide font-bold p-4 rounded-md"
            >
              Play Again
            </button>
          )}
          <div>
            {attempts.length > 0 && (
              <div className="flex p-2 flex-col font-mono gap-2 rounded-md bg-white/20 border border-white/50">
                {attempts.length > 0 &&
                  attempts.map((attempt, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-between w-full"
                    >
                      <p className="text-white font-semibold">
                        <span className="text-2xl">+{attempt.score}{(attempt.score > 450 ) && '🔥'}</span>
                 
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
                  Total score: {score}
                </h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
