import { all, takeEvery } from "redux-saga/effects";
import ActionType from "../Constant/Users/ActionType";
import { handleAddRoles, handleAddUsers, handleDelRoles, handleDelUsers, handleLoginUsers, handleRegisterUsers, handleRole, handleRoles, handleUpdatePhotoUsers, handleUpdateRoles, handleUpdateUsers, handleUser, handleUsers } from "./Users/usersSaga";

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
        takeEvery(ActionType.REGISTER, handleRegisterUsers),
        takeEvery(ActionType.GET_ROLES, handleRoles),
        takeEvery(ActionType.GET_ROLE, handleRole),
        takeEvery(ActionType.ADD_ROLES, handleAddRoles),
        takeEvery(ActionType.UPDATE_ROLES, handleUpdateRoles),
        takeEvery(ActionType.DEL_ROLES, handleDelRoles),
        
        //HR

        //Hotels

        //Booking

        //Resto

        //Payment

        //Purchase
    ])
}

export default watchAll