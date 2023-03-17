import { call, put } from "redux-saga/effects";
import { doAddDepartmentFailed, doAddDepartmentSucceed, doDeleteDepartmentFailed, doDeleteDepartmentSucceed, doDepartmentRequestFailed, doDepartmentRequestSucceed, doDepartmentsRequestFailed, doDepartmentsRequestSucceed, doUpdateDepartmentFailed, doUpdateDepartmentSucceed } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import ActionType from "@/redux/Constant/HumanResources/HrActionType";
import { doJobrolesRequestFailed, doJobrolesRequestSucceed } from "@/redux/Actions/HumanResources/reducerJobroleAction";

function* handleJobroles():any  {
    try {
        const res = yield axios(API('get', 'jobrole'))
 
        yield put(doJobrolesRequestSucceed(res.data));
        
        return res.data.result

    } catch (error:any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doJobrolesRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doJobrolesRequestFailed(null))
    }
}


export  {
    handleJobroles,
   
}