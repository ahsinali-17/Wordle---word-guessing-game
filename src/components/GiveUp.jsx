import React from "react";
import { words } from "../assets/words";

const GiveUp = ({solution, setSolution,setGameState}) => {
  return (
    <div className="result">
      <h1>The word was {solution}</h1>
      <button className="btn" onClick={() =>{ 
        setSolution(words[Math.floor(Math.random() * words.length)]);
        setGameState("playing");
      }}>Play again</button>
    </div>
  );
};

export default GiveUp;
