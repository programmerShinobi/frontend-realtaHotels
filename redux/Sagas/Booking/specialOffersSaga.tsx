import { call, put } from "@redux-saga/core/effects";
import ApiSpecialOffers from "@/redux/Services/Booking/apiSpecialOffers";
import { specialOffersRequestFailed, specialOffersRequestSucceed } from "../../Actions/Booking/actionSpecialOffers";

function * handelSpecialOffers():any{
    try {
        const result = yield call(ApiSpecialOffers.getAll)
        yield put (specialOffersRequestSucceed(result.data))
    }catch(error:any){
        yield put (specialOffersRequestFailed(error))
    }
}

export {handelSpecialOffers}