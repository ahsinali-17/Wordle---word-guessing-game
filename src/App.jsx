import { useState, useEffect } from "react";
import { words } from "./assets/words";
import Line from "./components/Line";
import "./App.css";
import GiveUp from "./components/GiveUp";
import Won from "./components/Won";

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [solution, setSolution] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [disableHint, setdisAblehint] = useState(false)
  const [hintWords, setHintWords] = useState([]);
  const [msg, setMsg] = useState("Guess the word");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== "playing") return;

      if (e.key === "Enter") {
        if (currentGuess.length !== 5) return;
        if (!words.includes(currentGuess)) {
          setMsg("not a valid word!!!");
          setTimeout(() => {
            setMsg("Guess the word");
          }, 1000);
          setCurrentGuess("");
          return;
        }
        if (currentGuess === solution) {
          setGameState("won");
          setGuesses(Array(6).fill(null));
          setHintWords([]);
          setdisAblehint(false)
          setSolution(words[Math.floor(Math.random() * words.length)]);
          setCurrentGuess("");
          return;
        }
        let index = guesses.findIndex((g) => g == null);
        if (index == guesses.length - 1) {
          setGameState("lost");
          setGuesses(Array(6).fill(null));
          setHintWords([]);
          setdisAblehint(false)
          setCurrentGuess("");
          return;
        }
        if(index === guesses.length - 3){
          setdisAblehint(true)
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
    <>
      <div className="wordle">
        <h1 className="h">WORDLE</h1>
        <p className={`${msg=="Guess the word"?"":"red"}`}>{msg}</p>
        <div className="board">
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
        {hintWords}
        <div className="buttons">
          <button
            className="btn"
            onClick={() => {
              setGameState("lost");
              setGuesses(Array(6).fill(null));
              setCurrentGuess("");
              setHintWords([]);
              setdisAblehint(false)
            }}
          >
            Give Up
          </button>

          <button
            disabled={disableHint}
            className="btn"
            onClick={() => {
              let idx = guesses.findIndex((g) => g == null);
              
              let currentguesses = guesses.slice(0, guesses.length - 1);
              setGuesses(currentguesses);
              if(idx === guesses.length - 2){
                setdisAblehint(true)
                setMsg("No more hints available...")
                setTimeout(() => {
                  setMsg("Guess the word");
                }, 1000);
              }
              let index = solution.split("").findIndex((letter, i) => letter !== (currentGuess[i] || ""));
              
              if (index !== -1) { 
                let tempcurrent = currentGuess.split("");
                tempcurrent[index] = solution[index];
                setHintWords((prev) => [...prev, solution[index]]); 
                setCurrentGuess(tempcurrent.join(""));
              }
            }}
            
          >
            Hint
          </button>
        </div>

        <div
          className={`end ${gameState === "won" ? "flexed green" : "hidden"}`}
        >
          <Won setGameState={setGameState} setdisAblehint={setdisAblehint}/>
        </div>

        <div
          className={`end ${gameState === "lost" ? "flexed gray" : "hidden"}`}
        >
          <GiveUp
            solution={solution}
            setSolution={setSolution}
            setGameState={setGameState}
          />
        </div>
      </div>
    </>
  );
}

export default App;
