import { useReducer } from 'react'

import { SeaMapReducerAction, SeaMapType } from '../types'

const putShip = (payload) => {

}

const reducer = (state: SeaMapType, action: SeaMapReducerAction) => {
  switch (action.type) {
    case 'PUT_SHIP':
      return putShip(action.payload)
  }
}

export const useSeaMap = (initialState: SeaMapType) => {
  const [state, dispatch] = useReducer<SeaMapType>(initialState)
}