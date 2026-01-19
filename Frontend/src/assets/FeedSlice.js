import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addFeedInfo: (state, action) => {
      return action.payload;
    },
    removeFeedInfo: () => null,
  },
});

export const { addFeedInfo, removeFeedInfo } = FeedSlice.actions;

export default FeedSlice.reducer;
