import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";
import AuthService from "./authService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState= {
    users: [],
    user: user ? user : null,
    userAdmin: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getAllUsers = createAsyncThunk(
    'users/all',
    async (_, thunkAPI) => {
        try{
            return await authService.getAllUsers()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUser = createAsyncThunk(
    'users/user:id',
    async (id, thunkAPI) => {
        try{
            return await AuthService.getUser(id)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateUser = createAsyncThunk(
    'updateUser:id',
    async (userData, thunkAPI) => {
        try {
            return await AuthService.updateUser(userData)
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        }catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        }catch (error){
            const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async() => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.idSuccess = false
            state.isError = false
            state.message = ''
        },
        resetUser: (state) => { state.userAdmin = []}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userAdmin = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.userAdmin = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userAdmin = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.userAdmin = action.payload
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected , (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected , (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset, resetUser} = authSlice.actions

export default authSlice.reducer