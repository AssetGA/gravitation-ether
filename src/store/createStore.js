import { combineReducers, configureStore } from "@reduxjs/toolkit";
import permissionReducer from "./permission";

const rootReducer = combineReducers({
  permission: permissionReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
