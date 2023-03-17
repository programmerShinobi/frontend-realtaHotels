import { call, put } from "redux-saga/effects";
import { doAddVendpro, doAddVendproFailed, doAddVendproSucceed, doGetVendrpo, doGetVendrpoFailed, doGetVendrpoSucceed } from '../../Actions/Purchasing/vendproActions';
import vendproService from "@/redux/Services/Purchasing/vendproService";
function* handleVenproRequest ():any{
    try{
        // console.log(action.payload)
        const res=yield call(vendproService.findVendorProduct)

        yield put(doGetVendrpoSucceed(res.data.res))
    }catch(e:any){
        yield put(doGetVendrpoFailed(e))
    }
}

function* handleAddVendorProduct (action:any):any{
    try{
        const res = yield call(vendproService.addVendorProduct, action.payload)
        yield put(doAddVendproSucceed(res.data.result))
    }catch(e:any){
        yield put(doAddVendproFailed(e))
    }
}
export{
    handleVenproRequest,
    handleAddVendorProduct
}