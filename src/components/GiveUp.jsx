import React from "react";
import { words } from "../assets/words";

const GiveUp = ({ solution, setSolution, setGameState }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">The word was <span className="uppercase">{solution}</span></h1>
      <button
        className="bg-white text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
        onClick={() => {
          setSolution(words[Math.floor(Math.random() * words.length)]);
          setGameState("playing");
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default GiveUp;
