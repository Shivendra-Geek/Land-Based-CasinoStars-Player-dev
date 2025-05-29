import { configureStore } from '@reduxjs/toolkit';
import  languageSlice  from '../features/language/languageSlice';
import  sessionSlice  from '../features/session/sessionSlice';
import  balanceSlice  from '../features/balance/balanceSlice';

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            language: languageSlice,
            session : sessionSlice,
            balance : balanceSlice
        },
        devTools: true,
    });
    return store;
};
