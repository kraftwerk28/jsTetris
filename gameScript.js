'use strict';

let canvas;
let ctx;
let curFigure;
let gs = 20;
let ts = 18;

let grid = new Array(20);
for (let i = 0; i < 20; i++) {
  grid[i] = new Array(10);
}
for (let y = 0; y < grid.length; y++)
  for (let x = 0; x < grid[0].length; x++)
    grid[x][y] = 0;

window.onload = () => {
  canvas = document.getElementById('canv');
  ctx = canvas.getContext('2d');
  setInterval(Game, 200);
  document.addEventListener('keydown', keyDown);
  curFigure = new Figure(1, 1);
}

const Game = () => {
  checkCol();
  while (curFigure.position.x < 0)
    curFigure.mvRight();
  // while(curFigure.position.x<0)
  // curFigure.mvRight();
  curFigure.mvDown();


  Redraw();
}

const Redraw = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = 0;
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      switch (grid[x][y]) {
        case 1:
          ctx.fillStyle = 'red';
          break;
        case 2:
          ctx.fillStyle = 'orange';
          break;
        case 3:
          ctx.fillStyle = 'yellow';
          break;
        case 4:
          ctx.fillStyle = 'lime';
          break;
        case 5:
          ctx.fillStyle = 'blue';
          break;
        case 6:
          ctx.fillStyle = 'violet';
          break;
        default:
          ctx.fillStyle = 'black';
          break;
      }
      ctx.fillRect(x * gs, y * gs, ts, ts);
    }
  }
  switch (curFigure.fType) {
    case 0:
      ctx.fillStyle = 'red';
      break;
    case 1:
      ctx.fillStyle = 'orange';
      break;
    case 2:
      ctx.fillStyle = 'yellow';
      break;
    case 3:
      ctx.fillStyle = 'lime';
      break;
    case 4:
      ctx.fillStyle = 'blue';
      break;
    case 5:
      ctx.fillStyle = 'violet';
      break;
    default:
      ctx.fillStyle = 'black';
      break;
  }
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      if (curFigure.fGrid[y][x] != 0)
        ctx.fillRect(curFigure.position.x * gs + x * gs, curFigure.position.y * gs + y * gs, ts, ts);
    }
  }

  mxn.innerHTML = curFigure.fGrid[0].length + ' ' + curFigure.fGrid.length;
}

const Bake = () => {
  let x = 0;
  let y = 0;
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      if (curFigure.fGrid[y][x] !== 0)
        grid[curFigure.position.x + x][curFigure.position.y + y] = curFigure.fGrid[y][x];
    }
  }
  curFigure = new Figure(Math.floor(Math.random() * 4), Math.floor(Math.random() * 2));
  // destroyRaw();
}

const checkCol = () => {
  let x = 0;
  let y = 0;
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      try {
        if (grid[curFigure.position.x + x][curFigure.position.y + y + 1] !== 0 && curFigure.fGrid[y][x] !== 0) {
          // console.log(grid[curFigure.position.x + x][curFigure.position.y + y] + '!!!');
          Bake();
          break;
        }
      } catch (error) {
        while (curFigure.position.x < 0)
          curFigure.mvRight();
        while (curFigure.position.x > grid[0].length - curFigure[0].length - 10)
          curFigure.mvLeft();
      }
    }
  }
}

const destroyRaw = () => {
  let raw = 0;
  let cell = 0;
  let c = 0;
  for (raw = grid.length - 1; raw >= 0; raw--) {
    for (cell = 0; cell < grid[raw].length; cell++) {
      if (grid[raw][cell] !== 0) {
        c++;
      }
    }
    if (cell >= 8) {
      grid.splice(raw, 1);
    }
    console.log(c);
    c = 0;

  }
}

const keyDown = (e) => {
  switch (e.keyCode) {
    case 32:
      curFigure.rotate();
      break;
    case 37:
    case 65:
      curFigure.mvLeft();
      Redraw();
      break;
    case 39:
    case 68:
      curFigure.mvRight();
      Redraw();
      break;
    case 66:
      Bake();
      break;
  }
}
