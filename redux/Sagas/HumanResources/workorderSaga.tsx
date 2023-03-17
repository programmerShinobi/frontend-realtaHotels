import { call, put } from "redux-saga/effects";
import { doAddWorkorderFailed, doAddWorkorderSucceed, doDeleteWorkorderFailed, doDeleteWorkorderSucceed, doWorkorderRequestFailed, doWorkorderRequestSucceed, doWorkordersRequestFailed, doWorkordersRequestSucceed, doUpdateWorkorderFailed, doUpdateWorkorderSucceed } from "@/redux/Actions/HumanResources/reducerWorkordersAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import ActionType from "@/redux/Constant/HumanResources/HrActionType";

function* handleWorkorders():any  {
    try {
        const res = yield axios(API('get', 'workorders'))
        yield put(doWorkordersRequestSucceed(res.data));

    } catch (error:any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doWorkordersRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doWorkordersRequestFailed(null))
    }
}

function* handleWorkorder(action:any):any  {
    try {
        const res = yield axios(API('get', `workorders/${action.payload.wodeId}`))
        yield put(doWorkorderRequestSucceed(res.data));
        return res.data.result
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doWorkorderRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doWorkorderRequestFailed(null))
    }
}

function* handleAddWorkorder(action:any):any  {
    try {
        const res = yield axios(API('post', 'workorders/insert', action.payload))
        yield put(doAddWorkorderSucceed(res.data.result));
        return res.data.result
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddWorkorderFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddWorkorderFailed(null));
    }
}
 
function* handleUpdateWorkorder(action:any):any  {
    try {
        const res = yield axios(API('put', `workorders/update/${action.payload.deptId}`, action.payload))
        yield put(doUpdateWorkorderSucceed(res.data.result));

    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateWorkorderFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateWorkorderFailed(null));
    }
}

function* handleDeleteWorkorder(action:any):any  {

    try {
        const res = yield axios(API("delete", `workorders/delete/${action.payload}`));
        yield put(doDeleteWorkorderSucceed(action.payload));

    } catch (error: any) {
        console.log(error)
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteWorkorderFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteWorkorderFailed(null));
    }
}

export  {
    handleWorkorders,
    handleWorkorder,
    handleAddWorkorder,
    handleUpdateWorkorder,
    handleDeleteWorkorder
}