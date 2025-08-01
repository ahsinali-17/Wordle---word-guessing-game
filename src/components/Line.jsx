import React, { useState, useEffect, useRef } from "react";

const Line = ({ guess, isFinal, solution, gameState, hintWords, onInputChange, onSubmitGuess, isCurrentLine, lineIndex }) => {
  const defaultClasses = "w-12 h-12 border-2 border-black text-center uppercase text-lg font-bold";
  const [classes, setClasses] = useState(Array(5).fill(defaultClasses));
  const inputRefs = useRef([]);
  const boxes = [];

  useEffect(() => {
    if (gameState !== "playing") setClasses(Array(5).fill(defaultClasses));
    if (!isFinal) return;

    const newClasses = Array(5).fill("");
    const letterCount = {};
    const guessLower = guess.toLowerCase();
    const solutionLower = solution.toLowerCase();

    for (let i = 0; i < 5; i++) {
      letterCount[solutionLower[i]] = (letterCount[solutionLower[i]] || 0) + 1;
    }
    for (let i = 0; i < 5; i++) {
      if (guessLower[i] === solutionLower[i]) {
        newClasses[i] = `${defaultClasses} bg-green-500`; 
        letterCount[guessLower[i]]--;
      } else if (solutionLower.includes(guessLower[i]) && letterCount[guessLower[i]] > 0) {
        newClasses[i] = `${defaultClasses} bg-yellow-500`; 
        letterCount[guessLower[i]]--;
      } else {
        newClasses[i] = `${defaultClasses} bg-gray-500`;
      }
    }

    setClasses(newClasses);
  }, [isFinal]);

  const handleInputChange = (index, value) => {
    if (!isCurrentLine || isFinal) return;
    
    // Only allow alphabetic characters and convert to uppercase
    const letter = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    
    if (letter.length <= 1) {
      onInputChange(index, letter);
      
      // Auto-focus next input if letter was entered
      if (letter && index < 4) {
        setTimeout(() => {
          if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }
        }, 0);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (!isCurrentLine || isFinal) return;
    
    if (e.key === 'Enter') {
      onSubmitGuess();
    } else if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default backspace behavior
      
      if (guess[index] && guess[index] !== '') {
        // If current box has a letter, remove it
        onInputChange(index, '');
      } else if (index > 0) {
        // If current box is empty, move to previous box and remove its letter
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
          onInputChange(index - 1, '');
        }
      }
    }
  };

  for (let i = 0; i < 5; i++) {
    let char = guess?.[i] || '';
    boxes.push(
      <input
        ref={(el) => (inputRefs.current[i] = el)}
        type="text"
        value={char}
        onChange={(e) => handleInputChange(i, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, i)}
        className={`${classes[i]} ${
          hintWords.includes(char) ? "text-blue-500" : ""
        }`}
        key={i}
        data-index={`${lineIndex}-${i}`}
        maxLength={1}
        disabled={!isCurrentLine || isFinal}
        autoComplete="off"
        spellCheck="false"
        inputMode="text"
        autoCapitalize="characters"
      />
    );
  }

  return <div className="flex justify-center items-center gap-1">{boxes}</div>;
};

export default Line;
