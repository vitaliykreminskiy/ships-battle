export type ShipsCounts = {
  singles: number, 
  doubles: number,
  triples: number,
  fourths: number
}

export type ShipGhost = {
  boxesCount: number,
  xCoord: number,
  yCoord: number,
  xOffset: number,
  yOffset: number
}

/**
 * @note SeaMap is supposed to be represented as an 10x10 filled with the
 * following values which determine the status of current cell. Status is
 * allowed to be one of the following:
 * 
 * [empty string] - just cell without anything
 * [S]hip or it's part is on that cell
 * [D]ead ship or its part is on that cell
 * [P]oint, someone shot here but there's no ship (bummer, lmao) 
 */
export type SeaMapType = Array<Array<string>>

export type SeaMapReducerAction = {
  type: 'PUT_SHIP' | 'REMOVE_SHIP',
  payload: any
}
