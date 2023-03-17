import { call, put } from "@redux-saga/core/effects";
import ApiOrderDetails from "@/redux/Services/Booking/apiOrderDetails";
import { bookingOrderCreateFailed, bookingOrderCreateSucced, } from "@/redux/Actions/Booking/actionBookingOrder";

function * handleAddBo(action:any):any{
    try{
        const result = yield call(ApiOrderDetails.Create,action.payload)
        // console.log(result.data);
        yield put(bookingOrderCreateSucced(result.data))
    }catch(error:any){
        yield put(bookingOrderCreateFailed(error))
    }
}

export {handleAddBo};