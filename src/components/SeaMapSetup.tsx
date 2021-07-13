import React, { useState } from 'react'
import Sketch from 'react-p5'
import p5types from 'p5'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

import { drawSeaMap, drawShip } from '../utils/drawing'
import CONFIG from '../config/app'

type ShipsCounts = {
  singles: number, 
  doubles: number,
  triples: number,
  fourths: number
}

const {
  FRAME_RATE,
  CELL_DIMENSION,
  MAP_DIMENSION
} = CONFIG.DRAWING

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    seaMap: {
      margin: theme.spacing(3),
    }
  })
)

const SeaMapSetup = () => {
  const classes = useStyles()
  const [shipsCount, setShipsCount] = useState<ShipsCounts>({
    singles: 4,
    doubles: 3,
    triples: 2,
    fourths: 1
  })

  const horizontalSpacingPx = 40
  const verticalSpacingPx = 40
  const mapHeight = CELL_DIMENSION * (MAP_DIMENSION + 1)
  const mapWidth = CELL_DIMENSION * (MAP_DIMENSION + 1)
  const separatorXCoord = 
    (CELL_DIMENSION * (MAP_DIMENSION + 1)) + horizontalSpacingPx
  const shipsListXCoord = separatorXCoord + horizontalSpacingPx
  const shipsCountsXCoord = 
    shipsListXCoord + (CELL_DIMENSION * 4) + (horizontalSpacingPx * 2)

  const handleMouseDrag = (p5: p5types) => {
    console.log(p5.mouseX)
  }

  const setup = ((p5: p5types, canvasParentRef: Element) => {
    p5.frameRate(FRAME_RATE)
    // We need to add this single pixel to make all line have the same weight
    p5.createCanvas((mapWidth * 2) + 1, mapHeight + 1)
      .parent(canvasParentRef)

    p5.background(255)

    drawSeaMap(p5)

    // Separator line
    p5.stroke(255, 23, 68)
    p5.line(
      separatorXCoord, 
      CELL_DIMENSION, 
      separatorXCoord, 
      CELL_DIMENSION * (MAP_DIMENSION + 1)
    )
    p5.stroke(43, 177, 255)
  })

  const draw = (p5: p5types) => {
    // Available to place ships and theirs counts
    drawShip(p5, shipsListXCoord, CELL_DIMENSION, 4)
    drawShip(p5, shipsListXCoord, (CELL_DIMENSION * 2) + verticalSpacingPx, 3)
    drawShip(
      p5, 
      shipsListXCoord, 
      (CELL_DIMENSION * 3) + (verticalSpacingPx * 2), 
      2
    )
    drawShip(
      p5, 
      shipsListXCoord, 
      (CELL_DIMENSION * 4) + (verticalSpacingPx * 3), 
      1
    )


    p5.textStyle(p5.NORMAL)
      .stroke(43, 177, 255)
      .text(
        `x ${shipsCount.fourths}`,
        shipsCountsXCoord, 
        (CELL_DIMENSION * 2) - (CELL_DIMENSION / 3)
      )
      .text(
        `x ${shipsCount.triples}`,
        shipsCountsXCoord, 
        (CELL_DIMENSION * 3) + verticalSpacingPx - (CELL_DIMENSION / 3)
      )
      .text(
        `x ${shipsCount.doubles}`,
        shipsCountsXCoord, 
        (CELL_DIMENSION * 4) + (verticalSpacingPx * 2) - (CELL_DIMENSION / 3)
      )
      .text(
        `x ${shipsCount.singles}`,
        shipsCountsXCoord, 
        (CELL_DIMENSION * 5) + (verticalSpacingPx * 3) - (CELL_DIMENSION / 3)
      )
  };

  return (
    <div className={classes.seaMap}>
      <Sketch setup={setup} draw={draw} mouseDragged={handleMouseDrag}/>
    </div>
  )
}

export default SeaMapSetup