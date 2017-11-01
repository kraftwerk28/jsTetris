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

window.onload = () => {
  canvas = document.getElementById('canv');
  ctx = canvas.getContext('2d');
  setInterval(Game, 500);
  document.addEventListener('keydown', keyDown);
  curFigure = new Figure(1, 1);
  // alert(f);
  // f.rotate();
  // alert(f);
}

const Game = () => {
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
      }
      ctx.fillRect(x * gs, y * gs, ts, ts);
    }
  }

  switch (curFigure.fType) {
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
  }
  for (x = 0; x < curFigure.fGrid[0].length; x++) {
    for (y = 0; y < curFigure.fGrid.length; y++) {
      if (curFigure.fGrid[x][y] != 0)
        ctx.fillRect(curFigure.position.x * gs + x * gs, curFigure.position.y * gs + y * gs, ts, ts);
    }
  }
  for (let i = 0; i < 200; i++) {
    ctx.fillRect(i, i, 1, 1);
  }
}

const Bake = () => {

}

const keyDown = (e) => {
  switch (e.keyCode) {
    case 32:
      curFigure.rotate();
      break;

    default:
      break;
  }
}
