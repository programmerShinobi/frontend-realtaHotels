import { all, takeEvery } from "redux-saga/effects";
import ActionType from "../Constant/Users/ActionType";
import { handleAddUsers, handleDelUsers, handleLoginUsers, handleRegisterUsers, handleUpdatePhotoUsers, handleUpdateUsers, handleUser, handleUsers } from "./Users/usersSaga";

function* watchAll():any{
    yield all([
        //Master Reducer nya dibawah Comman masing" module

        //Users
        takeEvery(ActionType.GET_USERS, handleUsers),
        takeEvery(ActionType.GET_USER, handleUser),
        takeEvery(ActionType.ADD_USERS, handleAddUsers),
        takeEvery(ActionType.UPDATE_USERS, handleUpdateUsers),
        takeEvery(ActionType.UPDATE_PHOTO_USERS, handleUpdatePhotoUsers),
        takeEvery(ActionType.DEL_USERS, handleDelUsers),
        takeEvery(ActionType.LOGIN, handleLoginUsers),
        takeEvery(ActionType.REGISTER, handleRegisterUsers)
        
        //HR

        //Hotels

        //Booking

        //Resto

        //Payment

        //Purchase
    ])
}

export default watchAll