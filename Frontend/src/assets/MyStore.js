import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";

const MyStore = configureStore({ reducer: { user: UserReducer } })

export default MyStore;