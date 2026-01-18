import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name: "Feed",
    initialState: null,
    reducers: {
        addFeed: (state,action) => { return action.payload },
        removeFeed: () => null,
    }
})

export const { addFeed, removeFeed } = FeedSlice.actions;
export default FeedSlice.reducer