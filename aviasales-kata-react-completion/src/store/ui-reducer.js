import { createSlice, createSelector } from '@reduxjs/toolkit'

import { fetchSearchId, fetchTickets } from './tickets-reducer'

const initialState = {
  loading: false,
  error: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  // async actions
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchSearchId.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(fetchSearchId.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
      setTimeout(() => action.meta.dispatch(fetchSearchId()), 3000)
    })
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchTickets.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
      setTimeout(() => action.meta.dispatch(fetchTickets(action.meta.arg)), 1500)
    })
  },
})

const selectUiState = (state) => state.ui

export const selectLoading = createSelector(selectUiState, (uiState) => uiState.loading)
export const selectError = createSelector(selectUiState, (uiState) => uiState.error)

export default uiSlice.reducer
