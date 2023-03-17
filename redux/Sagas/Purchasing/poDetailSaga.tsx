import { doGetPurchaseOrderDetailFailed, doGetPurchaseOrderDetailSucceed } from "@/redux/Actions/Purchasing/purchaseOrderActions";
import purchaseOrderService from "@/redux/Services/Purchasing/purchaseOrderService";
import { call, put } from "redux-saga/effects";

function* handleGetPurchaseOrderDetail ():any{
    try{
        const res = yield call(purchaseOrderService.getPurchaseOrderDetail)
        yield put(doGetPurchaseOrderDetailSucceed(res.data))
    }catch(e:any){
        yield put(doGetPurchaseOrderDetailFailed(e))
    }
}

export{
    handleGetPurchaseOrderDetail
}