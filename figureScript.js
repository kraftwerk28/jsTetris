'use strict';

const allGrids = [
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 2],
    [0, 2],
    [2, 2]
  ],
  [
    [3, 0],
    [3, 3],
    [3, 0]
  ],
  [
    [0, 4],
    [4, 4],
    [4, 0]
  ],
  [
    [5, 0],
    [5, 5],
    [0, 5]
  ]
];

const Figure = function (type, rot) {
  this.fGrid = allGrids[type];
  console.log(this.fGrid.length);
  this.fType = type;
  this.position = { x: 3, y: 0 };
  this.rotation = Math.min(Math.max(rot, 0), 2);
  this.rotate = () => {
    let i = 0;

    for (i = 0; i < this.fGrid.length; i++) {
      console.log(this.fGrid[i] + '\n');
    }

    let tempGrid = new Array(this.fGrid.length);
    for (i = 0; i < this.fGrid.length; i++) {
      tempGrid[i] = this.fGrid[i].slice();
    }
    // console.log(this.fGrid.length + '   ' + this.fGrid[0].length);
    // console.log(tempGrid[0].length + '   ' + tempGrid.length);

    this.fGrid = new Array();
    for (i = 0; i < tempGrid[0].length; i++) {
      this.fGrid[i] = new Array(tempGrid.length);
    }
    // console.log(this.fGrid.length + ' ' + this.fGrid[0].length);

    let x = 0;
    let y = 0;

    for (y = 0; y < this.fGrid.length; y++) {
      for (x = 0; x < this.fGrid[y].length; x++) {
        this.fGrid[tempGrid[0].length - 1 - y][x] = tempGrid[x][y]; //counterclockwise rotate
        // this.fGrid[y][tempGrid.length - 1 - x] = tempGrid[x][y]; //clockwise rotate
      }
    }



    Redraw();
  };
  this.mvDown = () => { this.position.y++; };
  this.mvRight = () => { this.position.x++; };
  this.mvLeft = () => { this.position.x--; };
}
