import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./FeedSlice";

const MyStore = configureStore({
  reducer: { user: UserReducer, Feed: FeedReducer },
});

export default MyStore;