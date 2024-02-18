import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import DestinationsServices from "./destinationsServices";

const initialState = {
    destinations: [],
    destination: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getAllDestinations = createAsyncThunk(
    'destinations/all',
    async (_, thunkAPI) => {
        try{
            return await DestinationsServices.getAllDestinations()
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getDestinationById= createAsyncThunk(
    `destinations:id`,
    async (id, thunkAPI) => {
        try{
            return await DestinationsServices.getDestinationById(id)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const setDestination = createAsyncThunk(
    'destinations/addDestination',
    async (destination, thunkAPI) => {
        try {
            return await DestinationsServices.setDestination(destination)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateDestination = createAsyncThunk(
    'updateDestination:id',
    async (destinationData, thunkAPI) => {
        try{
            return await  DestinationsServices.updateDestination(destinationData)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteDestination = createAsyncThunk(
    'destinations/deleteDestination:id',
    async (id, thunkAPI) => {
        try {
            return await DestinationsServices.deleteDestination(id)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const destinationsSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetDestination: (state) =>{ state.destination = []}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDestinations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllDestinations.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.destinations = action.payload
            })
            .addCase(getAllDestinations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDestinationById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDestinationById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.destination = action.payload
            })
            .addCase(getDestinationById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(setDestination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setDestination.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.destination = action.payload
            })
            .addCase(setDestination.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateDestination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateDestination.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.destination = action.payload
            })
            .addCase(updateDestination.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteDestination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDestination.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.destination = action.payload
            })
            .addCase(deleteDestination.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset, resetDestination} = destinationsSlice.actions

export default destinationsSlice.reducer