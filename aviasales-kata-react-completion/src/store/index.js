import { configureStore } from '@reduxjs/toolkit'

import filtersReducer from './filters-reducer'
import ticketsReducer from './tickets-reducer'
import uiReducer from './ui-reducer'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
    ui: uiReducer,
  },
})
