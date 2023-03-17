import { call, put } from "redux-saga/effects";
import { doAddDepartmentFailed, doAddDepartmentSucceed, doDeleteDepartmentFailed, doDeleteDepartmentSucceed, doDepartmentRequestFailed, doDepartmentRequestSucceed, doDepartmentsRequestFailed, doDepartmentsRequestSucceed, doUpdateDepartmentFailed, doUpdateDepartmentSucceed } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import ActionType from "@/redux/Constant/HumanResources/HrActionType";
import { doShiftsRequestFailed, doShiftsRequestSucceed } from "@/redux/Actions/HumanResources/reducerShiftAction";

function* handleShifts():any  {
    try {
        const res = yield axios(API('get', 'shift'))
 
        yield put(doShiftsRequestSucceed(res.data));
        
        return res.data.result

    } catch (error:any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doShiftsRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doShiftsRequestFailed(null))
    }
}


export  {
    handleShifts,
   
}