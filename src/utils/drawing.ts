import p5Types from 'p5'

import CONFIG from '../config/app'

const {
  CELL_DIMENSION,
  MAP_DIMENSION
} = CONFIG.DRAWING

export const drawSeaMap = (p5: p5Types) => {
  const topLetters = ' ABCDEFGHKL'
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
      .text(topLetters[i], CELL_DIMENSION * i, CELL_DIMENSION / 4, CELL_DIMENSION, CELL_DIMENSION)
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
  vertical: boolean = false
) => {
  //! Logic of drawing may strongly depend on placement (horizontal/vertical)
  if (!vertical && boxes > 0) {
    for (let i = 0; i < boxes; i++) {
      p5.stroke(43, 177, 255)
      .noFill()
      .rect(x + (CELL_DIMENSION * i), y, CELL_DIMENSION, CELL_DIMENSION)
    }
  }
}