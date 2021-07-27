import { useReducer } from 'react'

import { Coordinate, SeaMapReducerAction, SeaMapType } from '../types'

type ShipCoordinate = {
  coordinate: Coordinate,
  boxesCount: number
}

const SHIP_SIGN = 'S'
const DEAD_SIGN = 'D'
const POINT_SIGN = 'P'

export const PUT_SHIP = 'PUT_SHIP'

export const useSeaMap = (initialState: SeaMapType) => {
  const putShip = (payload: ShipCoordinate) => {
    let seaMap = [ ...initialState ]
    let targetCoordinates: Array<Coordinate> = []
    let isOutFieldOfBoundaries = false
    const { coordinate, boxesCount } = payload

    // TODO: In the future we also need to implement the logic for vertical placement
    for (let i = 0; i < boxesCount; i++) {
      let targetX = coordinate.x + i

      if (targetX > initialState.length) {
        isOutFieldOfBoundaries = true
      }

      targetCoordinates.push({
        x: targetX,
        y: coordinate.y
      })
    }

    if (isOutFieldOfBoundaries) {
      return seaMap
    }

    for (let y = 0; y < seaMap.length; y++) {
      for (let x = 0; x < seaMap[y].length; x++) {        
        targetCoordinates.forEach(coordinate => {
          if (coordinate.x === x && coordinate.y === y) {
            seaMap[y - 1][x - 1] = SHIP_SIGN
          }
        })
      }
    }

    return seaMap
  }

  const reducer = (state: SeaMapType, action: SeaMapReducerAction) => {
    switch (action.type) {
      case PUT_SHIP:
        return putShip(action.payload)
      default:
        return state
    }
  }

  // TODO: Handle typing below
  const [state, dispatch] = useReducer<any>(reducer, initialState)

  return [
    state,
    dispatch
  ]
}