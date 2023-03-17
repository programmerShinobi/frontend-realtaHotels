import { call, put } from "redux-saga/effects";
import { doAddEmployeeFailed, doAddEmployeeSucceed, doDeleteEmployeeFailed, doDeleteEmployeeSucceed, doEmployeeRequestFailed, doEmployeeRequestSucceed, doEmployeesRequestFailed, doEmployeesRequestSucceed, doUpdateEmployeeFailed, doUpdateEmployeeSucceed } from "@/redux/Actions/HumanResources/reducerEmployeeAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";


function* handleEmployees(): any {
    try {
        const res = yield axios(API('get', 'employee'))
        yield put(doEmployeesRequestSucceed(res.data));
        return res.data.result
    } catch (error: any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeesRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeesRequestFailed(null))
    }
}
 
function* handleEmployee(action: any): any {
    try {
        const res = yield axios(API('get', `employee/${action.payload}`))
        yield put(doEmployeeRequestSucceed(res.data));
        return res.data.result
    } catch (error: any) {
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeeRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeeRequestFailed(null))
    }
}

function* handleAddEmployee(action: any): any {

    try {
        const res = yield axios(API('post', 'employee/insert', action.payload))
        // console.log("res add : ",res)
        yield put(doAddEmployeeSucceed(res.data.result));
        return res.data.result
    } catch (error: any) {

        // console.log("res err : ", error)

        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddEmployeeFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddEmployeeFailed(null));
    }
}

function* handleUpdateEmployee(action: any): any {

    try {
        const res = yield axios(API('put', `employee/update/${action.payload.emp_id}`, action.payload))
        yield put(doUpdateEmployeeSucceed(res.data.result));

    } catch (error: any) {
        // console.log("error", error)
        
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateEmployeeFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateEmployeeFailed(null));
    }
}

function* handleDeleteEmployee(action: any): any {

    try {
        const res = yield axios(API("delete", `employee/delete/${action.payload}`));
        yield put(doDeleteEmployeeSucceed(action.payload));

    } catch (error: any) {
        console.log(error)
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteEmployeeFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteEmployeeFailed(null));
    }
}

export {
    handleEmployees,
    handleEmployee,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee
}