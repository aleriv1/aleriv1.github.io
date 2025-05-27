import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { dispatch }) => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  if (!response.ok) throw new Error('Ошибка при получении searchId')
  const data = await response.json()
  dispatch(fetchTickets(data.searchId))
  return data.searchId
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, { dispatch, getState }) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (!response.ok) throw new Error('Ошибка при получении билетов')
  const data = await response.json()
  const currentTickets = getState().tickets.tickets
  if (!data.stop) {
    dispatch(fetchTickets(searchId))
  }
  return [...currentTickets, ...data.tickets]
})

const initialState = {
  searchId: null,
  tickets: [],
  sortType: 'cheapest',
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSortType(state, action) {
      state.sortType = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.searchId = action.payload
    })
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
    })
  },
})

export const { setSortType } = ticketsSlice.actions
export default ticketsSlice.reducer
