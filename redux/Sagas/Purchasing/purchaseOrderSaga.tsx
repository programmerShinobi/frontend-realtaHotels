import { doEditOrderHeaderFailed, doEditOrderHeaderSucceed, doGetPurchaseOrderFailed, doGetPurchaseOrderSucceed, doInsertOrderHeaderFailed, doInsertOrderHeaderSucceed } from "@/redux/Actions/Purchasing/purchaseOrderActions";
import purchaseOrderService from "@/redux/Services/Purchasing/purchaseOrderService";
import { call, put } from "redux-saga/effects";

function* handleInsertPurchaseOrder (action:any):any{
    try{
        const res = yield call(purchaseOrderService.insertPurchaseOrder, action.payload)
        yield put(doInsertOrderHeaderSucceed(res.data))
    }catch(e:any){
        yield put(doInsertOrderHeaderFailed(e))
    }
}
function* handleGetPurchaseOrder():any{
    try{
        const res = yield call(purchaseOrderService.getPurchaseOrder)
        yield put(doGetPurchaseOrderSucceed(res.data))
    }catch(e:any){
        console.log(e)
        yield put(doGetPurchaseOrderFailed(e))
    }
}

function* handleEditPurchaseOrder(action:any):any{
    try{
        const res = yield call (purchaseOrderService.editPurchaseOrder, action.payload)
        yield put(doEditOrderHeaderSucceed(res.data))
    }catch(e:any){
        yield put(doEditOrderHeaderFailed(e))
    }
}


export{
    handleInsertPurchaseOrder,
    handleGetPurchaseOrder,
    handleEditPurchaseOrder
}