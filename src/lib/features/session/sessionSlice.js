import { createSlice } from '@reduxjs/toolkit';

export const defaultSession = {
    userId: '',
    username: '',
    accountType: 'visitor',
    remoteId: '',
    currencyAbrv: 'USD',
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: defaultSession,
    reducers: {
        setSession: (state, action) => {
            const { userId, accountType, username, remoteId, currencyObj } = action.payload;
            state.currencyAbrv = currencyObj?.currencyAbrv;
            state.userId = userId;
            state.accountType = accountType;
            state.username = username;
            state.remoteId = remoteId;
        },
        destroySession: (state) => {
            const { userId, accountType, username, remoteId } = defaultSession;
            state.userId = userId;
            state.accountType = accountType;
            state.username = username;
            state.remoteId = remoteId;
            state.currencyAbrv = '';
        },
    },
});

export const { setSession, destroySession } = sessionSlice.actions;
export default sessionSlice.reducer;
