import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  snakeIntersection,
  getSnakeHead,
} from "./snake.js";
import {
  update as updateFoo,
  draw as drawFood
} from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');


function main(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER')) {
      window.location.href = window.location.href;
    }
    return;
  }

  window.requestAnimationFrame(main)
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);


function update() {
  updateSnake();
  updateFoo()
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard);
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead())
    || snakeIntersection();
}
