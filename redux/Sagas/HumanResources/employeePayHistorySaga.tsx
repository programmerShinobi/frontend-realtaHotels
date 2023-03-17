import { call, put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import { doEmployeePayHistorysRequestSucceed, doEmployeePayHistorysRequestFailed, doEmployeePayHistoryRequestSucceed, doEmployeePayHistoryRequestFailed, doAddEmployeePayHistorySucceed, doAddEmployeePayHistoryFailed, doUpdateEmployeePayHistorySucceed, doUpdateEmployeePayHistoryFailed, doDeleteEmployeePayHistorySucceed, doDeleteEmployeePayHistoryFailed } from "@/redux/Actions/HumanResources/reducerEmployeePayHistory";

function* handleEmployeePayHistorys(action: any):any  {
    const queryParams = new URLSearchParams();
    queryParams.append("ephiEmp", action.payload.ephiEmp);

    if (action.payload.page){
        queryParams.append("page", action.payload.page);
    }

    try {
        const res = yield axios(API('get', `employee-pay-history?${queryParams.toString()}`))
        yield put(doEmployeePayHistorysRequestSucceed(res.data));
    } catch (error:any) { 
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeePayHistorysRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeePayHistorysRequestFailed(null))
    }
}

function* handleEmployeePayHistory():any  {
    try {
        const res = yield axios(API('get', `employee-pay-history/alldata`))
        yield put(doEmployeePayHistoryRequestSucceed(res.data));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doEmployeePayHistoryRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doEmployeePayHistoryRequestFailed(null))
    }
}

function* handleAddEmployeePayHistory(action:any):any  {    
    try {
        const res = yield axios(API('post', 'employee-pay-history/insert', action.payload))
        yield put(doAddEmployeePayHistorySucceed(res.data.result));
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddEmployeePayHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddEmployeePayHistoryFailed(null));
    }

}
 
function* handleUpdateEmployeePayHistory(action:any):any  {
    try {
        const res = yield axios(API('put', `employee-pay-history/update/${action.payload.ephiId}`, action.payload))
        yield put(doUpdateEmployeePayHistorySucceed(res.data.result));

    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateEmployeePayHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateEmployeePayHistoryFailed(null));
    }
}

function* handleDeleteEmployeePayHistory(action:any):any  {
    
    const queryParams = new URLSearchParams();

    queryParams.append("ephiEmp", action.payload.ephiEmp);
    queryParams.append("ephiId", action.payload.ephiId);
    queryParams.append("page", action.payload.page);

    try {
        const res = yield axios(API("delete", `employee-pay-history/delete?${queryParams.toString()}`));
        
        yield put(doDeleteEmployeePayHistorySucceed(res.data.result));

    } catch (error: any) {
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteEmployeePayHistoryFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteEmployeePayHistoryFailed(null));
    }
}

export  {
    handleEmployeePayHistorys,
    handleEmployeePayHistory,
    handleAddEmployeePayHistory,
    handleUpdateEmployeePayHistory,
    handleDeleteEmployeePayHistory
}