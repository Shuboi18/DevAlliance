import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'User',
    initialState: null,
    reducers: {
        addUserInfo:(state, action) => {
            return action.payload;
        },
        removeUserInfo:() => null,
    }
})

export const { addUserInfo, removeUserInfo } = UserSlice.actions;

export default UserSlice.reducer;