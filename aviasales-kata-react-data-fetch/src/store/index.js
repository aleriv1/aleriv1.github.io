import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

// #region actions
const TOGGLE_FILTER = 'TOGGLE_FILTER'
const TOGGLE_ALL_FILTERS = 'TOGGLE_ALL_FILTERS'
// #endregion actions

// #region action creators
export const toggleFilter = (filter) => ({
  type: TOGGLE_FILTER,
  payload: filter,
})
// #endregion action creators

export const toggleAllFilters = (checked) => ({
  type: TOGGLE_ALL_FILTERS,
  payload: checked,
})

// #region redcuer
const initialState = {
  filters: {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  },
}

/* eslint-disable indent */
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const newFilters = { ...state.filters, [action.payload]: !state.filters[action.payload] }

      if (action.payload !== 'all' && state.filters.all && !newFilters[action.payload]) {
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

      return { ...state, filters: newFilters }
    }

    case TOGGLE_ALL_FILTERS:
      return {
        ...state,
        filters: {
          all: action.payload,
          noStops: action.payload,
          oneStop: action.payload,
          twoStops: action.payload,
          threeStops: action.payload,
        },
      }

    default:
      return state
  }
}
/* eslint-disable indent */
// #endregion redcuer

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose

export const store = createStore(filterReducer, composeEnhancers(applyMiddleware(thunk)))
