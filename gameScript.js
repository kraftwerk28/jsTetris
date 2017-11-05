'use strict';

let canvas;
let ctx;
let curFigure;
let gs = 20;
let ts = 18;

let isPause = true;
let pauseVar;

let grid = new Array(20);
for (let i = 0; i < 20; i++) {
  grid[i] = new Array(10);
}
for (let y = 0; y < grid.length; y++)
  for (let x = 0; x < grid[0].length; x++)
    grid[y][x] = 0;


window.onload = () => {
  canvas = document.getElementById('canv');
  ctx = canvas.getContext('2d');
  pauseVar = setInterval(Game, 200);
  document.addEventListener('keydown', keyDown);
  createFigure();
};

const Game = () => {
  checkCol();
  curFigure.mvDown();
  Redraw();
};

const Redraw = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = 0;
  for (y = 0; y < grid.length; y++) {
    for (x = 0; x < grid[y].length; x++) {
      switch (grid[y][x]) {
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
          ctx.fillStyle = 'cyan';
          break;
        case 6:
          ctx.fillStyle = 'blue';
          break;
        case 7:
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
      ctx.fillStyle = 'cyan';
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
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      if (curFigure.fGrid[y][x] != 0)
        ctx.fillRect(curFigure.position.x * gs + x * gs, curFigure.position.y * gs + y * gs, ts, ts);
    }
  }
  mxn.innerHTML = curFigure.fGrid[0].length + ' ' + curFigure.fGrid.length + ' ' + curFigure.fType;
};

const Bake = () => {
  let x = 0;
  let y = 0;
  for (y = 0; y < curFigure.fGrid.length; y++) {
    for (x = 0; x < curFigure.fGrid[0].length; x++) {
      if (curFigure.fGrid[y][x] !== 0)
        // grid[curFigure.position.y + y][curFigure.position.x + x] = curFigure.fGrid[y][x];
        grid[curFigure.position.y + y][curFigure.position.x + x] = curFigure.fGrid[y][x];
    }
  }
  destroyRaw();
  clearInterval(pauseVar);
  pauseVar = setInterval(Game, 200);
  createFigure();
  // console.log(grid[0]);
};

const checkCol = () => {
  let x = 0;
  let y = 0;
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      try {
        if (grid[curFigure.position.y + y + 1][curFigure.position.x + x] !== 0 && curFigure.fGrid[y][x] !== 0) {
          Bake();
          break;
        }
      } catch (error) {
        Bake();
        break;
      }
    }
  }
};

const checkSides = (side) => {
  let canMove = true;
  let x = 0;
  let y = 0;
  let s = 0;

  if (side === 'right')
    s = 1;
  else if (side === 'left')
    s = -1;

  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      try {
        if (grid[curFigure.position.y + y][curFigure.position.x + x + s] !== 0 && curFigure.fGrid[y][x] !== 0) {
          canMove = false;
          break;
        }
      } catch (error) {
        canMove = false;
        break;
      }
    }
  }
  return canMove;
};

const checkRotation = () => {
  let canRotate = true;
  let x = 0;
  let y = 0;

  let testGrid = curFigure.rotated();
  for (x = 0; x < testGrid[0].length; x++) {
    for (y = 0; y < testGrid.length; y++) {
      try {
        if (grid[curFigure.position.y + y][curFigure.position.x + x] !== 0 && testGrid[y][x] !== 0) {
          canRotate = false;
          break;
        }
      } catch (error) {
        canRotate = false;
        break;
      }
    }
  }

  // if (checkSides)
  return canRotate;
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
    console.log(c);
    if (c >= 10) {
      // playDestroyAnim(raw);
      grid.splice(raw, 1);
      grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      raw++;
    }
    c = 0;
  }
}

const playDestroyAnim = (raw) => {

  let i = 4;
  const a = () => {
    if (i >= 0) {
      i--;
      ctx.fillStyle = 'black';
      ctx.fillRect(i * gs, raw * gs, ts, ts);
      ctx.fillRect(((grid[0].length - 1) - i) * gs, raw * gs, ts, ts);
    }
    else {
      pause();
      clearInterval(anm);
    }
  };
  pause();
  let anm = setInterval(a, 100);

}

const pause = () => {
  isPause = !isPause;
  if (isPause) {
    pauseVar = setInterval(Game, 200);
    document.addEventListener('keydown', keyDown);
  }
  else {
    clearInterval(pauseVar);
    document.removeEventListener('keydown', keyDown);
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
    case 40:
    case 83:
      clearInterval(pauseVar);
      pauseVar = setInterval(Game, 20);
      break;
    case 66:
      Bake();
      break;
    case 80:
      pause();
      break;
  }
}
