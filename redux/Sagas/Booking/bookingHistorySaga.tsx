import { call, put } from "@redux-saga/core/effects";
import ApiOrderDetails from "@/redux/Services/Booking/apiOrderDetails";
import { orderDetailHistoryRequestFailed, orderDetailHistoryRequestSecced } from "@/redux/Actions/Booking/actionBookingHistory";

function * handelHistory(action:any):any{
    try {
        const result = yield call(ApiOrderDetails.GetHistory,action.payload)
        yield put (orderDetailHistoryRequestSecced(result.data))
    }catch(error:any){
        yield put (orderDetailHistoryRequestFailed(error))
    }
}

function * handelupdateHistory(action:any):any{
    try {
        const result = yield call(ApiOrderDetails.UpdateHistory,action.payload)
        yield put (orderDetailHistoryRequestSecced(result.data))
    }catch(error:any){
        yield put (orderDetailHistoryRequestFailed(error))
    }
}

export {handelHistory, handelupdateHistory}