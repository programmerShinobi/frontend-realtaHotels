import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from '../Sagas';
import usersReducers from "../Reducers/Users/usersReducer";

const saga = createSagaMiddleware()
const reducer = combineReducers({
    //Master Reducer nya dibawah Comman masing" module

    //Users
    usersReducers: usersReducers
  
    //HR

    //Hotels

    //Booking

    //Resto

    //Payment

    //Purchase

});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saga),
});
saga.run(rootSaga)

export default store;
