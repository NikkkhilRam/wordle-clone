import { useEffect, useRef, useState } from "react";

function WordTiles({ enabled = false, callback, wordle  }) {
  const [word, setWord] = useState(["", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const letterRef = useRef([]);

  useEffect(() => {
    if (letterRef.current[0]) {
      letterRef.current[0].focus();
    }

  }, []);

  const handleChange = (e, index) => {
    const newWord = [...word];
    newWord[index] = e.target.value.toUpperCase();
    setWord(newWord);

    if (e.target.value && index < word.length - 1) {
      letterRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newWord = [...word];
      if (!newWord[index] && index > 0) {
        letterRef.current[index - 1].focus();
      } else {
        newWord[index] = "";
        setWord(newWord);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    callback(word.join(""));
  };

  const tileColor = (index) => {
    if (!submitted) {
      return "bg-[#121214]";
    }

    const wordleArray = wordle.split("");

    if (word[index] === wordleArray[index]) {
      return "bg-green-500";
    }

    if (wordleArray.includes(word[index])) {
      return "bg-yellow-500";
    }

    return "bg-[#3A3A3C]";
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {word.map((letter, index) => (
        <input
          key={index}
          ref={(input) => (letterRef.current[index] = input)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          value={letter}
          maxLength={1}
          disabled={!enabled}
          className={`w-12 h-12 border-2 border-[#3A3A3B] text-center font-bold text-white text-3xl uppercase ${tileColor(
            index
          )}`}
        />
      ))}
      <button type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
}

export default WordTiles;
