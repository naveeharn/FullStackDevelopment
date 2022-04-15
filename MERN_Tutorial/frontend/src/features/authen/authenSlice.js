import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authenService from './authenService'
// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register user
export const register = createAsyncThunk('authen/register', async (user, thunkAPI) => {
    try {
        return await authenService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// login user
export const login = createAsyncThunk('authen/login', async (user, thunkAPI) => {
    try {
        return await authenService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('authen/logout', async () => {
    await authenService.logout()
})


export const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
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
            .addCase(login.rejected, (state, action) => {
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
export const { reset } = authenSlice.actions
export default authenSlice.reducer