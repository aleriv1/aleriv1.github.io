import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

// #region actions
const TOGGLE_FILTER = 'TOGGLE_FILTER'
const TOGGLE_ALL_FILTERS = 'TOGGLE_ALL_FILTERS'
const SET_SEARCH_ID = 'SET_SEARCH_ID'
const SET_TICKETS = 'SET_TICKETS'
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'
const SET_SORT_TYPE = 'SET_SORT_TYPE'
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
    // Повторная попытка через 3 секунды
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

    // Добавляем новые билеты к существующим
    const currentTickets = getState().tickets
    dispatch(setTickets([...currentTickets, ...data.tickets]))

    // Если поиск не завершен, продолжаем запрашивать
    if (!data.stop) {
      dispatch(fetchTickets(searchId))
    }
  } catch (error) {
    dispatch(setError(error.message))
    // Повторная попытка через 3 секунды
    setTimeout(() => dispatch(fetchTickets(searchId)), 3000)
  } finally {
    dispatch(setLoading(false))
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
  loading: false,
  error: null,
  sortType: 'cheapest',
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

    case SET_LOADING:
      return { ...state, loading: action.payload }

    case SET_ERROR:
      return { ...state, error: action.payload }

    case SET_SORT_TYPE:
      return { ...state, sortType: action.payload }

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
