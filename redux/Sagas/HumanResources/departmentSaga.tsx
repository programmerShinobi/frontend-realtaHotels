import { call, put } from "redux-saga/effects";
import { doAddDepartmentFailed, doAddDepartmentSucceed, doDeleteDepartmentFailed, doDeleteDepartmentSucceed, doDepartmentRequestFailed, doDepartmentRequestSucceed, doDepartmentsRequestFailed, doDepartmentsRequestSucceed, doUpdateDepartmentFailed, doUpdateDepartmentSucceed } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";

function* handleDepartments():any  {
    try {
        const res = yield axios(API('get', 'department'))
        yield put(doDepartmentsRequestSucceed(res.data));

    } catch (error:any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDepartmentsRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doDepartmentsRequestFailed(null))
    }
}

function* handleDepartment():any  {
    try {
        const res = yield axios(API('get', `department/alldata`))
        yield put(doDepartmentRequestSucceed(res.data));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDepartmentRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doDepartmentRequestFailed(null))
    }
}

function* handleAddDepartment(action:any):any  {
    try {
        const res = yield axios(API('post', 'department/insert', action.payload))
        yield put(doAddDepartmentSucceed(res.data.result));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddDepartmentFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddDepartmentFailed(null));
    }
}
 
function* handleUpdateDepartment(action:any):any  {

    try {
        const res = yield axios(API('put', `department/update/${action.payload.deptId}`, action.payload))
        yield put(doUpdateDepartmentSucceed(res.data.result));

    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateDepartmentFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateDepartmentFailed(null));
    }
}

function* handleDeleteDepartment(action:any):any  {
    const queryParams = new URLSearchParams();
    queryParams.append("deptId", action.payload.deptId);
    queryParams.append("page", action.payload.page);

    try {
        const res = yield axios(API("delete", `department/delete?${queryParams.toString()}`));
        
        yield put(doDeleteDepartmentSucceed(res.data.result));

    } catch (error: any) {
        console.log(error)
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteDepartmentFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteDepartmentFailed(null));
    }
}

export  {
    handleDepartments,
    handleDepartment,
    handleAddDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment
}