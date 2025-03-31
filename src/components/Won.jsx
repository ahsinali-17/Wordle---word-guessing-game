import React from "react";

const Won = ({ setGameState, setDisableHint }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-green-500 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">You Won!</h1>
      <button
        className="bg-white text-green-600 font-semibold px-4 py-2 rounded-md hover:bg-green-700 hover:text-white transition"
        onClick={() => {
          setGameState("playing");
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default Won;
