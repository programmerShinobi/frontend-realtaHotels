import { call, put } from "redux-saga/effects";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import ActionType from "@/redux/Constant/HumanResources/HrActionType";
import { doAddWorkorderdetailFailed, doAddWorkorderdetailSucceed, doDeleteWorkorderdetailFailed, doDeleteWorkorderdetailSucceed, doUpdateWorkorderdetailFailed, doUpdateWorkorderdetailSucceed, doWorkorderdetailRequestFailed, doWorkorderdetailRequestSucceed, doWorkorderdetailsRequestFailed, doWorkorderdetailsRequestSucceed } from "@/redux/Actions/HumanResources/reducerWorkorderDetailAction";

function* handleWorkorderdetails(action: any):any  {

    const queryParams = new URLSearchParams();
    queryParams.append("wodeWoro", action.payload.wodeId);

    if (action.payload.page) {
        queryParams.append("page", action.payload.page);
    }

    try {
        const res = yield axios(API('get', `work-order-detail?${queryParams.toString() }`))
        yield put(doWorkorderdetailsRequestSucceed(res.data));

    } catch (error:any) {
        const delay = (time: any) => new Promise((resolve) => setTimeout(resolve, time));
        yield put(doWorkorderdetailsRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doWorkorderdetailsRequestFailed(null))
    }
}

function* handleWorkorderdetail(action:any):any  {
    try {
        const res = yield axios(API('get', `work-order-detail/${action.payload.wodeId}`))
        yield put(doWorkorderdetailRequestSucceed(res.data));
        return res.data.result
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doWorkorderdetailRequestFailed(error.response.data.message))
        yield call(delay, 6000);
        yield put(doWorkorderdetailRequestFailed(null))
    }
}

function* handleAddWorkorderdetail(action:any):any  {
    try {
        const res = yield axios(API('post', 'work-order-detail/insert', action.payload))
        yield put(doAddWorkorderdetailSucceed(res.data.result));
        return res.data.result
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doAddWorkorderdetailFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doAddWorkorderdetailFailed(null));
    }
}
 
function* handleUpdateWorkorderdetail(action:any):any  {
    try {
        const res = yield axios(API('put', `work-order-detail/update/${action.payload.wodeId}`, action.payload))
        yield put(doUpdateWorkorderdetailSucceed(res.data.result));
 
    } catch (error:any) {
        const delay = (time: any) =>
        new Promise((resolve) => setTimeout(resolve, time));
        yield put(doUpdateWorkorderdetailFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doUpdateWorkorderdetailFailed(null));
    }
}

function* handleDeleteWorkorderdetail(action:any):any  {
    const queryParams = new URLSearchParams();
    queryParams.append("wodeWoro", action.payload.wodeWoro);
    queryParams.append("page", action.payload.page);
    queryParams.append("wodeId", action.payload.wodeId);

    try {
        const res = yield axios(API("delete", `work-order-detail/delete?${queryParams.toString() }`));
        yield put(doDeleteWorkorderdetailSucceed(res.data.result));

    } catch (error: any) {
        const delay = (time: any) =>
            new Promise((resolve) => setTimeout(resolve, time));
        yield put(doDeleteWorkorderdetailFailed(error.response.data.message));
        yield call(delay, 6000);
        yield put(doDeleteWorkorderdetailFailed(null));
    }
}

export  {
    handleWorkorderdetails,
    handleWorkorderdetail,
    handleAddWorkorderdetail,
    handleUpdateWorkorderdetail,
    handleDeleteWorkorderdetail
}