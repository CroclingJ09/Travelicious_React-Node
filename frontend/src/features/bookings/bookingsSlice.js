import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BookingsServices from "./bookingsServices";


const initialState = {
    bookings: [],
    booking: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getUserBookings = createAsyncThunk(
    'bookings/user',
    async (userId, thunkAPI) => {
        try {
            return await BookingsServices.getUserBookings(userId)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getBookingById= createAsyncThunk(
    `bookings:id`,
    async (id, thunkAPI) => {
        try{
            return await BookingsServices.getBookingById(id)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const setBooking = createAsyncThunk(
    'bookings/bookDestination',
    async (booking, thunkAPI) => {
        try {
            return await BookingsServices.setBooking(booking)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking:id',
    async (id, thunkAPI) => {
        try {
            return await BookingsServices.deleteBooking(id)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetBooking: (state) => {state.booking = []}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserBookings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserBookings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bookings = action.payload
            })
            .addCase(getUserBookings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBookingById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.booking = action.payload
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(setBooking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setBooking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.booking = action.payload
            })
            .addCase(setBooking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.booking = action.payload
            })
            .addCase(deleteBooking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.booking = action.payload
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.booking = action.payload
            })
    }
})

export const {reset, resetBooking} = bookingsSlice.actions

export default bookingsSlice.reducer

