import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    languageData: {},
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguageData(state, action) {
            state.languageData = action.payload;
        },
    },
});

export const { setLanguageData } = languageSlice.actions;
export default languageSlice.reducer;
