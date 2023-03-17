import { doGetPhotoDashboardFailed, doGetPhotoDashboardSucceed, doGetStockPhotoFailed, doGetStockPhotoSucceed } from "@/redux/Actions/Purchasing/sphoActions";
import stockPhotoServices from "@/redux/Services/Purchasing/stockPhotoService";
import { call, put } from "redux-saga/effects";

function * handleGetStockPhoto ():any{
    try{
        const res = yield call(stockPhotoServices.getAllStockPhoto)
        yield put(doGetStockPhotoSucceed(res.data))
    }catch(e:any){
        yield put(doGetStockPhotoFailed(e))
    }
}

function* handleGetStockPhotoDashboard ():any{
    try{
        const res = yield call(stockPhotoServices.getStockPhotoDashboard)
        yield put(doGetPhotoDashboardSucceed(res.data.result))
    }catch(e:any){
        yield put(doGetPhotoDashboardFailed(e))
    }
}

export {
    handleGetStockPhoto,
    handleGetStockPhotoDashboard
}