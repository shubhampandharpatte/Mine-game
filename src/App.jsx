import { useState } from 'react';
import './App.css';
import Square from './Square/Square';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(difficulty) {
  const mineCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
  const randomNumbers = [];
  
  while (randomNumbers.length < mineCount) {
    let randomNumber = getRandomInt(1, 25);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  
  return randomNumbers;
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [difficulty, setDifficulty] = useState('easy');
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers(difficulty));

  function restartGame() {
    setGameOver(false);
    setScore(100);
    setRandomNumbers(generateRandomNumbers(difficulty));
  }

  function handleDifficultyChange(event) {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    restartGame();
  }

  const items = [];
  for (let index = 1; index < 26; index++) {
    items.push(
      <Square 
        key={index}
        mine={randomNumbers.includes(index)}
        setScore={setScore} 
        gameOver={gameOver} 
        setGameOver={setGameOver}
      />
    );
  }

  return (
    <>
      <div className='controls'>
        <label>
          Difficulty:
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button onClick={restartGame}>Restart Game</button>
      </div>
      <div className='d-flex gap-10'>
        <div className='totalScore'>
          <p>Total Score</p>
          <p>{score} PTS</p>
        </div>
        <div className='d-grid'>
          {items}
        </div>
      </div>
    </>
  );
}

export default App;
