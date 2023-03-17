import {doAddStocksFailed, doAddStocksSucceed, doEditStocksFailed, doEditStocksSucceed, doGetStocksFailed, doGetStocksSucceed } from "@/redux/Actions/Purchasing/stockActions";
import stockService from "@/redux/Services/Purchasing/stocksService";
import { call, put } from "redux-saga/effects";

function* handleGetStocks ():any{
    try{
        const res = yield call(stockService.getStocks)

        yield put(doGetStocksSucceed(res.data))
    }catch(e:any){
        yield put(doGetStocksFailed(e))
    }
}
function* handleAddStocks (action:any):any{
    try{
        const res = yield call(stockService.createStocks,action.payload)
        yield put(doAddStocksSucceed(res.data.result))
        return res.data.result
    }catch(e){
        yield put(doAddStocksFailed(e))
    }
}

function* handleUpdateStocks (action:any):any{
    try{
        const res = yield call(stockService.updateStocks, action.payload)
        yield put(doEditStocksSucceed(res.data.result))
    }catch(e:any){
        console.log(e)
        yield put(doEditStocksFailed(e))
    }
}
export {
    handleGetStocks,
    handleAddStocks,
    handleUpdateStocks
}