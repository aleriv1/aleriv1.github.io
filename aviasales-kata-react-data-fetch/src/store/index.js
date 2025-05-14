import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

// #region actions
const TOGGLE_FILTER = 'TOGGLE_FILTER'
const TOGGLE_ALL_FILTERS = 'TOGGLE_ALL_FILTERS'
const SET_SEARCH_ID = 'SET_SEARCH_ID'
const SET_TICKETS = 'SET_TICKETS'
// #endregion actions

// #region action creators
export const toggleFilter = (filter) => ({
  type: TOGGLE_FILTER,
  payload: filter,
})

export const toggleAllFilters = (checked) => ({
  type: TOGGLE_ALL_FILTERS,
  payload: checked,
})

export const setSearchId = (searchId) => ({
  type: SET_SEARCH_ID,
  payload: searchId,
})

export const setTickets = (tickets) => ({
  type: SET_TICKETS,
  payload: tickets,
})
// #endregion action creators

// #region async actions
export const fetchSearchId = () => async (dispatch) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    const data = await response.json()
    dispatch(setSearchId(data.searchId))
    dispatch(fetchTickets(data.searchId))
  } catch (error) {
    console.error('Ошибка при получении searchId:', error)
  }
}

export const fetchTickets = (searchId) => async (dispatch) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    const data = await response.json()
    dispatch(setTickets(data.tickets))
  } catch (error) {
    console.error('Ошибка при получении билетов:', error)
  }
}
// #endregion async actions

// #region reducer
const initialState = {
  filters: {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  },
  searchId: null,
  tickets: [],
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

    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload }

    case SET_TICKETS:
      return { ...state, tickets: action.payload }

    default:
      return state
  }
}
/* eslint-disable indent */
// #endregion reducer

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const store = createStore(filterReducer, composeEnhancers(applyMiddleware(thunk)))
