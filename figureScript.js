'use strict';

const allGrids = [
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0]
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1]
  ]
];

const Figure = function (type, rot) {
  this.fGrid = allGrids[Math.min(Math.max(type, 0), allGrids.length - 1)];
  console.log(this.fGrid.length);
  this.fType = type;
  this.position = { x: 3, y: 0 };
  this.rotation = Math.min(Math.max(rot, 0), 2);
  this.rotate = () => {

    for (var x = 0; x < this.fGrid.length; x++) {
      console.log(this.fGrid[x] + '\n');
    }


    let tempGrid = new Array(this.fGrid.length);
    for (let i = 0; i < this.fGrid.length; i++) {
      tempGrid[i] = this.fGrid[i].slice();
    }
    // console.log(this.fGrid.length + '   ' + this.fGrid[0].length);
    // console.log(tempGrid[0].length + '   ' + tempGrid.length);

    this.fGrid = new Array();
    for (let i = 0; i < tempGrid[0].length; i++) {
      this.fGrid[i] = new Array(tempGrid.length);
    }
    // console.log(this.fGrid.length + ' ' + this.fGrid[0].length);


    for (let y = 0; y < this.fGrid[0].length; y++) {
      for (let x = 0; x < this.fGrid.length; x++) {
        // this.fGrid[tempGrid[0].length - 1 - y, x] = tempGrid[x, y];
        this.fGrid[x, y] = tempGrid[y, x] + 1;
      }
    }

    // for (var x = 0; x < tempGrid.length; x++) {
    //   console.log(tempGrid[x] + '\n');
    // }
    // console.log('\n');


    Redraw();
    // console.log(this.fGrid.length + ' ' + this.fGrid[0].length);
  }
  this.mvDown = () => {
    this.position.y++;
  }

}
