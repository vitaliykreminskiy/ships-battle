import p5Types from 'p5'

import CONFIG from '../config/app'

const {
  DRAWING: {
    CELL_DIMENSION,
    MAP_DIMENSION
  },
  TOP_LETTERS
} = CONFIG

export const drawSeaMap = (p5: p5Types) => {
  const mapWidth = CELL_DIMENSION * (MAP_DIMENSION + 1)

  //Drawing lines, horizontal and then vertical
  p5.stroke(43, 177, 255)
    .strokeWeight(1)
  for (let i = 1; i <= MAP_DIMENSION + 1; i++) {
    p5.line(CELL_DIMENSION, CELL_DIMENSION * i, mapWidth, CELL_DIMENSION * i)
  }

  for (let i = 1; i <= MAP_DIMENSION + 1; i++) {
    p5.line(CELL_DIMENSION * i, CELL_DIMENSION, CELL_DIMENSION * i, mapWidth)
  }

  //Drawing letters and numbers
  for (let i = 1; i <= MAP_DIMENSION + CELL_DIMENSION; i++) {
    p5.textAlign(p5.CENTER)
      .textSize(CELL_DIMENSION / 2)
      .fill(43, 177, 255)
      .text(TOP_LETTERS[i], CELL_DIMENSION * i, CELL_DIMENSION / 4, CELL_DIMENSION, CELL_DIMENSION)
  }

  for (let i = 1; i <= MAP_DIMENSION + 1; i++) {
    p5.text(i, 0, CELL_DIMENSION * i + (CELL_DIMENSION / 4), CELL_DIMENSION, CELL_DIMENSION * i)
  }
}

export const drawShip = (
  p5: p5Types,
  x: number, 
  y: number, 
  boxes: number = 1, 
  vertical: boolean = false,
  strokeColor: string = '#2bb1ff'
) => {
  //! Logic of drawing may strongly depend on placement (horizontal/vertical)
  if (!vertical && boxes > 0) {
    for (let i = 0; i < boxes; i++) {
      p5.stroke(strokeColor)
      .noFill()
      .rect(x + (CELL_DIMENSION * i), y, CELL_DIMENSION, CELL_DIMENSION)
    }
  }
}