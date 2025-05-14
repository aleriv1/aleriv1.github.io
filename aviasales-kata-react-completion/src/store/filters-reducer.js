import { TOGGLE_FILTER, TOGGLE_ALL_FILTERS } from './actionTypes'

const initialState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
}

/* eslint-disable indent */
const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const newFilters = { ...state, [action.payload]: !state[action.payload] }

      if (action.payload !== 'all' && state.all && !newFilters[action.payload]) {
        newFilters.all = false
      }

      if (
        action.payload !== 'all' &&
        newFilters.noStops &&
        newFilters.oneStop &&
        newFilters.twoStops &&
        newFilters.threeStops
      ) {
        newFilters.all = true
      }

      return newFilters
    }

    case TOGGLE_ALL_FILTERS:
      return {
        all: action.payload,
        noStops: action.payload,
        oneStop: action.payload,
        twoStops: action.payload,
        threeStops: action.payload,
      }

    default:
      return state
  }
}
/* eslint-disable indent */

export default filtersReducer
