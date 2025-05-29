import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBalance } from './balanceApi';

const initialState = {
    balance: null,
    points: null,
    currency: 'USD',
    balanceArr: [],
    fetchBalance: false,
    loading: true,
    userDefaultCurrency: null,
    rollover: null,
    bonus: null,
    isUser: false,
};

export const fetchBalanceApi = createAsyncThunk('balance/fetchBalance', async (remoteId) => {
    return await getBalance(remoteId);
});

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setBalance(state) {
            state.fetchBalance = !state.fetchBalance;
        },
        resetState(state) {
            Object.assign(state, initialState); 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalanceApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBalanceApi.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchBalanceApi.rejected, (state) => {
                state.loading = false;
                state.userDefaultCurrency = { currencyAbrv: 'USD', currencyName: 'United States Dollar' };
                state.isUser = false;
            });
    },
});

export const { setCurrency, setBalance, resetState } = balanceSlice.actions;
export default balanceSlice.reducer;
