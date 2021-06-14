import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Language {
    EN = 'EN',
    Español = 'Español',
}

declare module 'react-redux' {
    interface DefaultRootState {
        language: string;
    }
}

const langSlice = createSlice({
    name: 'lang',
    initialState: Language.EN,
    reducers: {
        changeLanguage(_state: Language, action: PayloadAction<Language>) {
            return action.payload;
        },
    },
});

export const { reducer } = langSlice;
export const { changeLanguage } = langSlice.actions;
