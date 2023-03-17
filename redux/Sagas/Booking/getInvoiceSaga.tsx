import { call, put } from "@redux-saga/core/effects";
import ApiOrderDetails from "@/redux/Services/Booking/apiOrderDetails";
import { getInvoiceSucceed,getInvoiceFailed } from "../../Actions/Booking/actionInvoice";

function * handleInvoice():any{
    try {
        const result = yield call(ApiOrderDetails.getInvoice)
        yield put (getInvoiceSucceed(result.data))
        // console.log(result.data);        
    }catch(error:any){
        yield put (getInvoiceFailed(error))
    }
}


export {handleInvoice }