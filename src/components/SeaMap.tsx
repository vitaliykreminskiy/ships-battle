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

//TODO: Bring out this config to separate object
const mapDimension = 10
const cellHeight = 50
const cellWidth = 50
const mapHeight = cellHeight * mapDimension
const mapWidth = cellWidth * mapDimension

const setup = ((p5: p5types, canvasParentRef: Element) => {
  p5.createCanvas(mapWidth, mapHeight).parent(canvasParentRef)
})

//TODO: Split drawing function
const draw = (p5: p5types) => {
  p5.background(255);
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