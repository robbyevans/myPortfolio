import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
