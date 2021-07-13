import React from 'react'
import Sketch from 'react-p5'
import p5types from 'p5'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    seaMap: {
      margin: theme.spacing(3)
    }
  })
)

const topLetters = ' ABCDEFGHKL'

//TODO: Bring out this config to separate object
const frameRate = 10
const mapDimension = 10
const cellHeight = 45
const cellWidth = 45
const mapHeight = cellHeight * (mapDimension + 1)
const mapWidth = cellWidth * (mapDimension + 1)

const setup = ((p5: p5types, canvasParentRef: Element) => {
  p5.frameRate(frameRate)
  //We need to add this single pixel to make the all line have the same weight
  p5.createCanvas(mapWidth + 1, mapHeight + 1)
    .parent(canvasParentRef)

  p5.background(255)

  //Drawing lines, horizontal and then vertical
  p5.stroke(43, 177, 255)
    .strokeWeight(1)
  for (let i = 1; i <= mapDimension + cellWidth; i++) {
    p5.line(cellWidth, cellHeight * i, mapWidth, cellHeight * i)
  }

  for (let i = 1; i <= mapDimension + cellHeight; i++) {
    p5.line(cellWidth * i, cellHeight, cellWidth * i, mapWidth)
  } 

  //Drawing letters and numbers
  for (let i = 1; i <= mapDimension + cellWidth; i++) {
    p5.textAlign(p5.CENTER)
      .textSize(cellHeight / 2)
      .fill(43, 177, 255)
      .text(topLetters[i], cellWidth * i, cellHeight / 4, cellWidth, cellHeight)
  }

  for (let i = 1; i <= mapDimension + 1; i++) {
    p5.text(i, 0, cellHeight * i + (cellHeight / 4), cellWidth , cellHeight * i)
  }
})

//TODO: Split drawing function
const draw = (p5: p5types) => {
  //
};

const SeaMap = () => {
  const classes = useStyles()

  return (
    <div className={classes.seaMap}>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

export default SeaMap