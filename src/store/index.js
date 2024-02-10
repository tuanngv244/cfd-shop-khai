// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import counterReducer from "./reducers/counterReducer";
// import dogReducer from "./reducers/dogReducer";
import authReducer from "./reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environments";
import cartReducer from "./reducers/cartReducer";
// import { thunkMiddleware } from "redux-thunk";

// const reducers = combineReducers({
//   counter: counterReducer,
//   dog: dogReducer,
// });

// const middleware = (store) => (next) => (action) => {
//   if (typeof action == "function") {
//     action(store.dispatch);
//     return;
//   }
//   next(action);
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducers,

//   composeEnhancers(applyMiddleware(middleware))
// );
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  // configureStore sử dụng redux-thunk như default middleware
  // middleware: (getDefaultMiddleware) =>
  // 	getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});

export default store;
