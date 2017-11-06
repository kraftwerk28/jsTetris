'use strict';


const createFigure = () => {
  // let type = Math.floor(Math.random() * allGrids.length);
  curFigure = new Figure(nextType, Math.floor(Math.random() * allGrids[nextType].length));
  // curFigure = new Figure(nextType, Math.floor(Math.random() * allGrids[type].length));
  nextType = Math.floor(Math.random() * allGrids[nextType].length);
  RedrawNext();
}

// main figure constructor
const Figure = function (type, rot) {
  this.fGrid = allGrids[type][rot];
  this.fType = type;
  this.position = { x: 3, y: 0 };
  this.rotation = rot;

  this.rotate = () => {
    if (checkRotation()) {
      this.fGrid = this.rotated();
      if (this.rotation >= allGrids[type].length - 1)
        this.rotation = 0;
      else
        this.rotation++;
      Redraw();
    }
  }
  this.rotated = () => {
    let r = 0;
    if (this.rotation >= allGrids[type].length - 1)
      r = 0;
    else
      r = this.rotation + 1;
    return allGrids[this.fType][r];
  }
  this.mvDown = () => { this.position.y++; };
  this.mvRight = () => { if (checkSides('right')) this.position.x++; };
  this.mvLeft = () => { if (checkSides('left')) this.position.x--; };
}
