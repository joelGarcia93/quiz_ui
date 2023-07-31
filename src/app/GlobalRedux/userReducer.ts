'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    token: number
}

const initialState: UserState = {
    token: 0
}

export const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state: any, action: any) => { 
            state.token = action.payload
        },
        removeToken: () => initialState
    }
});

export const {
    setToken, removeToken
} = userState.actions;
export default userState.reducer;
