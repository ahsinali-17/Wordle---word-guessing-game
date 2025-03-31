import { useState, useEffect } from "react";
import { words } from "../src/assets/words";
import Line from "../src/components/Line";
import GiveUp from "../src/components/GiveUp";
import Won from "../src/components/Won";
import Info from "../src/components/Info";

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [solution, setSolution] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [disableHint, setDisableHint] = useState(2);
  const [hintWords, setHintWords] = useState([]);
  const [msg, setMsg] = useState("Guess the word");
  const [HTP, setHTP] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== "playing") return;

      if (e.key === "Enter") {
        if (currentGuess.length !== 5) return;
        if (!words.includes(currentGuess)) {
          setMsg(`${currentGuess} not a valid word!!!`);
          setCurrentGuess("");
          setTimeout(() => setMsg("Guess the word"), 1000);
          return;
        }
        if (currentGuess === solution) {
          setGameState("won");
          setGuesses(Array(6).fill(null));
          setHintWords([]);
          setDisableHint(2);
          setSolution(words[Math.floor(Math.random() * words.length)]);
          setCurrentGuess("");
          return;
        }
        let index = guesses.findIndex((g) => g == null);
        if (index === guesses.length - 1) {
          setGameState("lost");
          setGuesses(Array(6).fill(null));
          setHintWords([]);
          setDisableHint(2);
          setCurrentGuess("");
          return;
        }
        if (index === guesses.length - 3) {
          setDisableHint(0);
        }
        const newGuesses = [...guesses];
        newGuesses[index] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
      }

      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length === 5) return;

      setCurrentGuess(currentGuess + e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, gameState, solution]);

  return (
    <div className="h-screen flex flex-col justify-around items-center font-bold uppercase overflow-hidden">
      <div className="flex justify-between w-full px-4 items-center relative">
        <h1 className="text-2xl text-center">WORDLE</h1>
        <img
          onClick={() => {
            setHTP(!HTP);
          }}
          className="bg-black rounded-full p-1"
          src={HTP ? "./x.svg" : "./info.svg"}
          alt="i"
        />
        <div
          className={`htp ${
            HTP ? "block" : "hidden"
          } w-5/6 lg:w-1/2 absolute right-5 top-12 bg-white rounded-lg shadow-lg shadow-gray-400`}
        >
          <Info />
        </div>
      </div>
      <p className={`${msg === "Guess the word" ? "" : "text-red-600"}`}>
        {msg}
      </p>
      <div className="flex flex-col gap-1">
        {guesses.map((guess, i) => {
          const isCurrent = i === guesses.findIndex((g) => g == null);
          return (
            <Line
              key={i}
              guess={isCurrent ? currentGuess : guess ?? ""}
              isFinal={!isCurrent && guess != null}
              solution={solution}
              gameState={gameState}
              hintWords={hintWords}
            />
          );
        })}
      </div>
    
      <div className="flex gap-2">
        <button
          className="px-2 py-1 border-2 border-black bg-gray-800 cursor-pointer w-[35vw] text-white font-semibold text-lg rounded-lg"
          onClick={() => {
            setGameState("lost");
            setGuesses(Array(6).fill(null));
            setCurrentGuess("");
            setHintWords([]);
            setDisableHint(2);
          }}
        >
          Give Up
        </button>
        <button
          disabled={disableHint === 0}
          className="px-2 py-1 border-2 border-black bg-gray-800 cursor-pointer w-[35vw] text-white font-semibold text-lg rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={() => {
            setDisableHint((prev) => prev -1);
            let guessNo = guesses.findIndex((g) => g == null);
            if (disableHint === 0 || guessNo === 4) {
              setDisableHint(0)
              setMsg("No more hints available...");
              setTimeout(() => setMsg("Guess the word"), 1000);
              return;
            }
            let index = solution
              .split("")
              .findIndex((letter, i) => letter !== (currentGuess[i] || ""));
            if (index !== -1) {
              let tempcurrent = currentGuess.split("");
              tempcurrent[index] = solution[index];
              setHintWords((prev) => [...prev, solution[index]]);
              setCurrentGuess(tempcurrent.join(""));
            }
          }}
        >
          Hint: {disableHint}
        </button>
      </div>
      
      <div
        className={`${
          gameState === "won"
            ? "fixed inset-0 flex flex-col items-center justify-center bg-green-400"
            : "hidden"
        }`}
      >
        <Won setGameState={setGameState} setDisableHint={setDisableHint} />
      </div>
      <div
        className={`${
          gameState === "lost"
            ? "fixed inset-0 flex flex-col items-center justify-center bg-gray-400"
            : "hidden"
        }`}
      >
        <GiveUp
          solution={solution}
          setSolution={setSolution}
          setGameState={setGameState}
        />
      </div>
    </div>
  );
}

export default App;
