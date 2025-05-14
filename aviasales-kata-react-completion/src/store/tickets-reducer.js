import { SET_SEARCH_ID, SET_TICKETS, SET_SORT_TYPE } from './actionTypes'

const initialState = {
  searchId: null,
  tickets: [],
  sortType: 'cheapest',
}

/* eslint-disable indent */
const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload }

    case SET_TICKETS:
      return { ...state, tickets: action.payload }

    case SET_SORT_TYPE:
      return { ...state, sortType: action.payload }

    default:
      return state
  }
}
/* eslint-disable indent */

export default ticketsReducer
