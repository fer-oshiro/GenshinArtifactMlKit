import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contador from "./contador";
import todoList from "./todoList";
import logger from "./middleware/logger";
import artifact from "./reducer/artifact";

const reducer = combineReducers({
  contador,
  todoList,
  artifact
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
