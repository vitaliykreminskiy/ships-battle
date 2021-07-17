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

type ShipGhost = {
  boxesCount: number,
  xCoord: number,
  yCoord: number
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
  const [shipGhost, setShipGhost] = useState<ShipGhost | false>(false)

  const horizontalSpacingPx = 40
  const verticalSpacingPx = 40
  const mapHeight = CELL_DIMENSION * (MAP_DIMENSION + 1)
  const mapWidth = CELL_DIMENSION * (MAP_DIMENSION + 1)
  const separatorXCoord = 
    (CELL_DIMENSION * (MAP_DIMENSION + 1)) + horizontalSpacingPx
  const shipsListXCoord = separatorXCoord + horizontalSpacingPx
  const shipsCountsXCoord = 
    shipsListXCoord + (CELL_DIMENSION * 4) + (horizontalSpacingPx * 2)

  /**
   * @note Ship ghost is a special visual entity which appears when you perform the 
   * drag
   */
  const addShipGhost = (p5: p5types, boxesCount: number): void => {
    const { mouseX, mouseY } = p5

    setShipGhost({
      boxesCount: boxesCount,
      xCoord: mouseX,
      yCoord: mouseY
    })
  }

  /**
   * Identifies whether the user cliked on the draggable entity
   * 
   * @param p5 - p5 drawing object
   * @returns false if not or number of boxes of the ship which the user clicked 
   * at
   */
  const identifyDraggableEntity = (p5: p5types): false | number => {
    const { mouseX, mouseY } = p5
    const maxShipBoxesCount = 4

    //TODO: Add also determining click on the SeaMap
    // That means that we've clicked somewhere into ShipsList area
    if (mouseX > shipsListXCoord && mouseY > CELL_DIMENSION) {
      for (let i = 0; i <= maxShipBoxesCount; i++) {
        const elementStartYCoord = 
          CELL_DIMENSION + (CELL_DIMENSION * i) + (verticalSpacingPx * i)
        const elementEndYCoord = elementStartYCoord + CELL_DIMENSION
        const elementEndXCoord = 
          shipsListXCoord + (CELL_DIMENSION * (maxShipBoxesCount - i))
        if (mouseY >= elementStartYCoord && mouseY <= elementEndYCoord &&
          mouseX <= elementEndXCoord) {
          return maxShipBoxesCount - i
        }
      }
    }

    return false
  } 

  const handleMousePressed = (p5: p5types): void => {
    const targetDraggableEntity = identifyDraggableEntity(p5)

    if (!targetDraggableEntity) {
      return
    }

    addShipGhost(p5, targetDraggableEntity)
  }

  const handleMouseReleased = (p5: p5types): void => {
    setShipGhost(false)
  }

  const handleMouseDrag = (p5: p5types) => {
    if (!shipGhost) {
      return
    }

    addShipGhost(p5, shipGhost.boxesCount)
  }

  const setup = ((p5: p5types, canvasParentRef: Element) => {
    p5.frameRate(FRAME_RATE)
    // We need to add this single pixel to make all line have the same weight
    p5.createCanvas((mapWidth * 2) + 1, mapHeight + 1)
      .parent(canvasParentRef)
  })

  const draw = (p5: p5types) => {
    p5.background('#FFF')

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

    if (shipGhost) {
      const { xCoord, yCoord, boxesCount } = shipGhost
      drawShip(p5, xCoord, yCoord, boxesCount, false, '#f45cff')
    }
  };

  return (
    <div className={classes.seaMap}>
      <Sketch 
        setup={setup} 
        draw={draw} 
        mouseDragged={handleMouseDrag}
        mousePressed={handleMousePressed}
        mouseReleased={handleMouseReleased}
      />
    </div>
  )
}

export default SeaMapSetup