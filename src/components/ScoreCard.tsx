import { useEffect } from "react";
import { useStore } from "../stores/app-store";

function ScoreCard() {
  const { attempts, setHighScore } = useStore();

  useEffect(() => {
    const highScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
    const savedHighScore = localStorage.getItem("highscore");

    if (highScore > (savedHighScore ? parseInt(savedHighScore) : 0)) {
      localStorage.setItem("highscore", highScore.toString());
      setHighScore(highScore);
    }
  }, [attempts, setHighScore]);

  const returnEmoji = (score: number) => {
    switch (true) {
      case score > 990:
        return "🎉";
      case score > 950:
        return "🥳";
      case score > 900:
        return "🤩";
      case score > 800:
        return "🔥";
      case score > 600:
        return "😎";
      case score > 400:
        return "😊";
      case score > 200:
        return "😕";
      default:
        return "😭";
    }
  };

  return (
    <>
      {attempts.length > 0 && (
        <div className="flex p-4 flex-col font-mono gap-2 rounded-md bg-white/20">
          {attempts.map((attempt, index) => (
            <div
              key={index}
              className=" flex items-center gap-8 justify-between w-full"
            >
              <p className="text-white font-semibold">
                <span className="text-2xl">
                  +{attempt.score}
                  {returnEmoji(attempt.score)}
                </span>
              </p>
              <div className="flex text-white font-mono">
                <div
                  className="p-2 rounded-l-md"
                  style={{ background: attempt.guessedColor }}
                >
                  {attempt.guessedColor}
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
      )}
    </>
  );
}

export default ScoreCard;
