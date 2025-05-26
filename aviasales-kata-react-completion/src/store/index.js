// import { createStore, applyMiddleware, compose } from 'redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'

import filtersReducer from './filters-reducer'
import ticketsReducer from './tickets-reducer'
import uiReducer from './ui-reducer'
import {
  TOGGLE_FILTER,
  TOGGLE_ALL_FILTERS,
  SET_SEARCH_ID,
  SET_TICKETS,
  SET_LOADING,
  SET_ERROR,
  SET_SORT_TYPE,
  // SET_VISIBLE_TICKETS,
} from './actionTypes'

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

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
})

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
})

export const setSortType = (sortType) => ({
  type: SET_SORT_TYPE,
  payload: sortType,
})

// #endregion action creators

// #region async actions
export const fetchSearchId = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    if (!response.ok) throw new Error('Ошибка при получении searchId')
    const data = await response.json()
    dispatch(setSearchId(data.searchId))
    dispatch(fetchTickets(data.searchId))
  } catch (error) {
    dispatch(setError(error.message))
    setTimeout(() => dispatch(fetchSearchId()), 3000)
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchTickets = (searchId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true))
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    if (!response.ok) throw new Error('Ошибка при получении билетов')
    const data = await response.json()

    const currentTickets = getState().tickets.tickets
    dispatch(setTickets([...currentTickets, ...data.tickets]))

    if (!data.stop) {
      dispatch(fetchTickets(searchId))
    }
  } catch (error) {
    dispatch(setError(error.message))
    setTimeout(() => dispatch(fetchTickets(searchId)), 3000)
  } finally {
    dispatch(setLoading(false))
  }
}
// #endregion async actions

const rootReducer = combineReducers({
  filters: filtersReducer,
  tickets: ticketsReducer,
  ui: uiReducer,
})

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose

// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export const store = createStore(rootReducer, applyMiddleware(thunk))
