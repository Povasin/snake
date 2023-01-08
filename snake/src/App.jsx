import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

export default function App() {
  const [snake, setSnake] = useState([36]);
  const [apple, setApple] = useState(12);
  const [print, setPrint] = useState("w");
  const [gameOver, setGameOver] = useState(false);

  function directionSnake(direction) {
    let newMass = snake.slice();
    newMass.push(newMass[snake.length - 1] + direction);
    if (newMass[snake.length - 1] === apple) {
      setApple(Math.floor(Math.random() * 64));
    } else {
      newMass.splice(0, 1);
    }
    for (let i = 0; i < newMass.length - 2; i++) {
      if (newMass[snake.length - 1] === newMass[i]) {
        setGameOver(true);
      }
    }
    setSnake(newMass);
  }
  function snakeDirection() {
    if (print == "w") {
      if (snake[snake.length - 1] - 8 < 0) {
        directionSnake(+56);
      } else {
        directionSnake(-8);
      }
    }
    if (print == "a") {
      if ((snake[snake.length - 1] - 1) % 8 == 7 || (snake[snake.length - 1] - 1) % 8 == -1) {
        directionSnake(+7);
      } else {
        directionSnake(-1);
      }
    }
    if (print == "s") {
      if (snake[snake.length - 1] + 8 > 63) {
        directionSnake(-56);
      } else {
        directionSnake(8);
      }
    }
    if (print == "d") {
      if ((snake[snake.length - 1] + 1) % 8 == 0) {
        directionSnake(-7);
      } else {
        directionSnake(1);
      }
    }
  }
  const tick = () => {
    snakeDirection();
  };
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener("keydown", e => {
      setPrint(e.key);
    });
  }, []);
  useEffect(() => {
    const timerID = setInterval(() => tick(), 500);
    return () => clearInterval(timerID);
  });
  function render() {
    const mass = [];
    for (let i = 0; i < 64; i++) {
      mass.push(i);
    }
    return mass.map(item =><div key={item} className={`cage ${snake.find(Array => Array === item) ? snake[snake.length - 1] === item ? "face" : "active" : item === apple ? "apple" : ""}`} ></div>)
  }
  return  (
    <div className='cages'>
      {!gameOver ? render() : <h1>GAME OVER</h1>} 
    </div>
  )
}