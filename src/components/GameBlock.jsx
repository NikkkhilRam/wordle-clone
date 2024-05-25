import { useEffect, useState } from "react";
import WordTiles from "./WordTiles";
import { EASY_WORDS } from "../utils/easyWords";
import ResultModal from "./ResultModal";
import { MEDIUM_HARD_WORDS } from "../utils/mediumWords";
import toast from "react-hot-toast";

function GameBlock() {
  const [round, setRound] = useState(0);
  const [wordleWord, setWordleWord] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [status, setStatus] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [level, setLevel] = useState([0, 1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    if (difficulty === 0) {
      const random = Math.floor(Math.random() * EASY_WORDS.length);
      setWordleWord(EASY_WORDS[random]);
    }
    if (difficulty === 1 || difficulty === 2) {
      const random = Math.floor(Math.random() * MEDIUM_HARD_WORDS.length);
      setWordleWord(EASY_WORDS[random]);
    }
  }, [difficulty]);

  //   useEffect(() => {
  //     if (wordleWord) {
  //       console.log(wordleWord);
  //     }
  //   }, [wordleWord, difficulty]);

  const handleNextRound = (word) => {
    if (word === wordleWord) {
      setStatus(1);
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
    } else {
      setRound((prev) => prev + 1);
      if (round === level.length - 1) {
        setStatus(0);
        setTimeout(() => {
          setShowResult(true);
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (round === 0) {
      setDifficulty(newDifficulty);
      if (newDifficulty === 0) {
        setLevel([0, 1, 2, 3, 4, 5, 6]);
      }

      if (newDifficulty === 1) {
        setLevel([0, 1, 2, 3, 4]);
      }

      if (newDifficulty === 2) {
        setLevel([0, 1, 2]);
      }
    } else {
      toast(
        "Hold your horses! Finish the current round to change the challenge level.",
        {
          icon: "😝",
        }
      );
    }
  };

  const resetGame = () => {
    setRound(0);
    setShowResult(false);
    setStatus(null);
    const random = Math.floor(Math.random() * EASY_WORDS.length);
    setWordleWord(EASY_WORDS[random]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      

      <div className="flex flex-col items-center justify-center w-full h-3/5 gap-2 ">
        {!showResult &&
          level.map((r) => (
            <WordTiles
              key={r}
              enabled={round === r}
              callback={handleNextRound}
              wordle={wordleWord}
            />
          ))}
      </div>

      {!showResult && (
        <div className="sm:w-1/4 sm:mt-10 mt-5">
          <ul className="flex items-center justify-around w-full sm:gap-1 gap-3">
            <button
              className={`w-20 text-black text-center text-lg py-1 rounded-full ${
                difficulty === 0 ? "bg-white" : "bg-gray-600"
              }`}
              onClick={() => handleDifficultyChange(0)}
            >
              Easy
            </button>
            <button
              className={`w-20 text-black text-center text-lg py-1 rounded-full ${
                difficulty === 1 ? "bg-white" : "bg-gray-600"
              }`}
              onClick={() => handleDifficultyChange(1)}
            >
              Medium
            </button>
            <button
              className={`w-20 text-black text-center text-lg py-1 rounded-full ${
                difficulty === 2 ? "bg-white" : "bg-gray-600"
              }`}
              onClick={() => handleDifficultyChange(2)}
            >
              Hard
            </button>
          </ul>
        </div>
      )}

      {showResult && (
        <ResultModal word={wordleWord} status={status} callback={resetGame} />
      )}
    </div>
  );
}

export default GameBlock;
