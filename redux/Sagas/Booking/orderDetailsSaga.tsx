import { call, put } from "@redux-saga/core/effects";
import ApiOrderDetails from "@/redux/Services/Booking/apiOrderDetails";
import { orderDetailRequestSecced, orderDetailRequestFailed } from "../../Actions/Booking/actionOrderDetails";

function * handelOrderDetails():any{
    try {
        const result = yield call(ApiOrderDetails.getAll)
        yield put (orderDetailRequestSecced(result.data))
        // console.log(result.data);        
    }catch(error:any){
        yield put (orderDetailRequestFailed(error))
    }
}


export {handelOrderDetails }