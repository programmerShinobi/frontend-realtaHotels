import { doGetFaciNameAndIdFailed, doGetFaciNameAndIdSucceed, doGetStockDetailFailed, doGetStockDetailSucceed, doUpdateStockDetailFailed, doUpdateStockDetailSucceed } from "@/redux/Actions/Purchasing/stockDetail";
import stodServices from "@/redux/Services/Purchasing/stodServices";
import { call, put } from "redux-saga/effects";

function* handleGetStockDetail():any{
    try{
        const res = yield call(stodServices.getAllStockDetail)
        yield put(doGetStockDetailSucceed(res.data))
    }catch(e:any){
        yield put(doGetStockDetailFailed(e))
    }
}

function* handleGetFaciNameAndId():any{
    try{
        const res = yield call(stodServices.getFaciName)
        yield put(doGetFaciNameAndIdSucceed(res.data))
    }catch(e:any){
        yield put(doGetFaciNameAndIdFailed(e))
    }
}

function* handleUpdateStockDetail (action:any):any{
    try{
        const res = yield call (stodServices.updateStockDetail,action.payload)
        yield put(doUpdateStockDetailSucceed(action.payload))
    }catch(e:any){
        yield put(doUpdateStockDetailFailed(e))
    }
}

export {
    handleGetStockDetail,
    handleGetFaciNameAndId,
    handleUpdateStockDetail
}