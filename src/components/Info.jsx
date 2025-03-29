import React from 'react'

const Info = () => {
  return (
    <div className="bg-gray-300 h-full w-full p-4 text-xs font-semibold">
        <ul className="flex flex-col gap-2">
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> You have 6 chances to guess the word.</li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> Each guess must be a valid 5-letter word.</li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> The color of the tiles will change to show how close your guess was to the word.</li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/><p><span className='text-green-500'>Green</span> tile means correct position.</p> </li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/><p><span className='text-yellow-500'>yellow</span> tile means correct letter but wrong position.</p> </li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> <p><span className='text-gray-500'>Gray</span> means the letter is not in the word.</p></li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> You can use the hint button to get a hint till 4 wrong guesses.</li>
            <li className="flex gap-2 items-center"> <img src="./dot.svg" alt="dot"/> But there is a catch, every time you get a hint, you will lose a chance.</li>
        </ul>
    </div>
  )
}

export default Info  