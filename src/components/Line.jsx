import React, { useState, useEffect } from "react";

const Line = ({ guess, isFinal, solution, gameState, hintWords }) => {
  const defaultClasses = "w-12 h-12 border-2 border-black flex justify-center items-center uppercase text-lg font-bold";
  const [classes, setClasses] = useState(Array(5).fill(defaultClasses));
  const boxes = [];

  useEffect(() => {
    if (gameState !== "playing") setClasses(Array(5).fill(defaultClasses));
    if (!isFinal) return;

    const newClasses = Array(5).fill("");
    const letterCount = {};

    // First pass: Mark correct (green)
    for (let i = 0; i < 5; i++) {
      letterCount[solution[i]] = (letterCount[solution[i]] || 0) + 1;
    }
    for (let i = 0; i < 5; i++) {
      if (guess[i] === solution[i]) {
        newClasses[i] = `${defaultClasses} bg-green-500`; 
        letterCount[guess[i]]--;
      } else if (solution.includes(guess[i]) && letterCount[guess[i]] > 0) {
        newClasses[i] = `${defaultClasses} bg-yellow-500`; 
        letterCount[guess[i]]--;
      } else {
        newClasses[i] = `${defaultClasses} bg-gray-500`;
      }
    }

    setClasses(newClasses);
  }, [isFinal]);

  for (let i = 0; i < 5; i++) {
    let char = guess?.[i];
    boxes.push(
      <div
        className={`${classes[i]} ${
          hintWords[i] ? (hintWords[i] === char ? "text-blue-500" : "") : ""
        } `}
        key={i}
      >
        {char}
      </div>
    );
  }

  return <div className="flex justify-center items-center gap-1">{boxes}</div>;
};

export default Line;
