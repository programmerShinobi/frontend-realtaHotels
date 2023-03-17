import { call, put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import { doEmployeeDepartmentHistorysRequestSucceed, doEmployeeDepartmentHistorysRequestFailed, doEmployeeDepartmentHistoryRequestSucceed, doEmployeeDepartmentHistoryRequestFailed, doAddEmployeeDepartmentHistorySucceed, doAddEmployeeDepartmentHistoryFailed, doUpdateEmployeeDepartmentHistorySucceed, doUpdateEmployeeDepartmentHistoryFailed, doDeleteEmployeeDepartmentHistorySucceed, doDeleteEmployeeDepartmentHistoryFailed } from "@/redux/Actions/HumanResources/reducerEmployeeDepartmentHistory";

function* handleEmployeeDepartmentHistorys(action: any):any  {
    const queryParams = new URLSearchParams();
    queryParams.append("edhiEmp", action.payload.edhiEmp);

    if (action.payload.page){
        queryParams.append("page", action.payload.page);
    }

    try {
        const res = yield axios(API('get', `employee-department-history?${queryParams.toString()}`))
        yield put(doEmployeeDepartmentHistorysRequestSucceed(res.data));
    } catch (error:any) { 
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeeDepartmentHistorysRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeeDepartmentHistorysRequestFailed(null))
    }
}

function* handleEmployeeDepartmentHistory():any  {
    try {
        const res = yield axios(API('get', `employee-department-history/alldata`))
        yield put(doEmployeeDepartmentHistoryRequestSucceed(res.data));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeeDepartmentHistoryRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeeDepartmentHistoryRequestFailed(null))
    }
}

function* handleAddEmployeeDepartmentHistory(action:any):any  {   
    try {
        const res = yield axios(API('post', 'employee-department-history/insert', action.payload))
        yield put(doAddEmployeeDepartmentHistorySucceed(res.data.result));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddEmployeeDepartmentHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddEmployeeDepartmentHistoryFailed(null));
    }

} 
 
function* handleUpdateEmployeeDepartmentHistory(action:any):any  {
    try {
        const res = yield axios(API('put', `employee-department-history/update/${action.payload.edhiId}`, action.payload))
        yield put(doUpdateEmployeeDepartmentHistorySucceed(res.data.result));

    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateEmployeeDepartmentHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateEmployeeDepartmentHistoryFailed(null));
    }
}

function* handleDeleteEmployeeDepartmentHistory(action:any):any  {
    const queryParams = new URLSearchParams();

    queryParams.append("edhiEmp", action.payload.edhiEmp);
    queryParams.append("edhiId", action.payload.edhiId);
    queryParams.append("page", action.payload.page);

    try {
        const res = yield axios(API("delete", `employee-department-history/delete?${queryParams.toString()}`));
        
        yield put(doDeleteEmployeeDepartmentHistorySucceed(res.data.result));

    } catch (error: any) {
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteEmployeeDepartmentHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteEmployeeDepartmentHistoryFailed(null));
    }
}

export  {
    handleEmployeeDepartmentHistorys,
    handleEmployeeDepartmentHistory,
    handleAddEmployeeDepartmentHistory,
    handleUpdateEmployeeDepartmentHistory,
    handleDeleteEmployeeDepartmentHistory
}