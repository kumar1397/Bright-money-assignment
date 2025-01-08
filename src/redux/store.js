import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";

const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

export default store;
