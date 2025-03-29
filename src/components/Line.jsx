import React, { useState, useEffect } from "react";

const Line = ({ guess, isFinal, solution, gameState, hintWords }) => {
  const [classes, setClasses] = useState(Array(5).fill("box"));
  const boxes = [];

  useEffect(() => {
    if (gameState !== "playing") setClasses(Array(5).fill("box")); 
    if (!isFinal) return; 

    const newClasses = Array(5).fill("box");
    const checked = [];

    // First pass: Mark correct (green)
    for (let i = 0; i < 5; i++) {
      if (guess[i] === solution[i]) {
        newClasses[i] = "box green";
        checked.push(i); // Track correct positions
      } else if(solution.includes(guess[i])) {
        const count = solution.split(guess[i]).length - 1; 
        if (count == 1 && !checked.includes(i)) {
          newClasses[i] = "box yellow"; 
        } else if(count > 1) {
          newClasses[i] = "box yellow"; 
        }
      } else {
        newClasses[i] = "box gray"; 
      }
    }
     
    setClasses(newClasses); // Set state only once
  }, [isFinal, guess, solution]);

  for (let i = 0; i < 5; i++) {
    let char = guess?.[i];
    boxes.push(<div className={`${classes[i]} ${hintWords[i]?(hintWords[i]==char?'blue':''):''}`} key={i}>{char}</div>);
  }

  return (
    <div className="line">
     {boxes}
    </div>
  );
};

export default Line;

