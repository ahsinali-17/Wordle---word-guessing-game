import React from 'react'

const Won = ({setGameState, setdisAblehint}) => {
  return (
    <div className="result">
        <h1>You won!</h1>
        <button className='btn' onClick={() => {setGameState("playing"); setdisAblehint(false)}}>Play again</button>
    </div>
  )
}

export default Won