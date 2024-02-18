import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import destinationsReducer from '../features/destinations/destinationsSlice'
import bookingsReducer from "../features/bookings/bookingsSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    bookings: bookingsReducer,
  },
});
