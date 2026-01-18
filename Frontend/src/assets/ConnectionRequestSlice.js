import { createSlice } from "@reduxjs/toolkit";

const ConnectionRequestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addConnectionReq: (state, action) => action.payload,
  },
});

export const { addConnectionReq } = ConnectionRequestSlice.actions;

export default ConnectionRequestSlice.reducer;
