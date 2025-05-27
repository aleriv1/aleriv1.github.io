import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter(state, action) {
      state[action.payload] = !state[action.payload]
      if (action.payload !== 'all' && state.all && !state[action.payload]) {
        state.all = false
      }
      if (action.payload !== 'all' && state.noStops && state.oneStop && state.twoStops && state.threeStops) {
        state.all = true
      }
    },
    toggleAllFilters(state, action) {
      state.all = action.payload
      state.noStops = action.payload
      state.oneStop = action.payload
      state.twoStops = action.payload
      state.threeStops = action.payload
    },
  },
})

const selectFiltersState = (state) => state.filters

export const selectFilters = createSelector(selectFiltersState, (filterState) => filterState)

export const { toggleFilter, toggleAllFilters } = filtersSlice.actions
export default filtersSlice.reducer
