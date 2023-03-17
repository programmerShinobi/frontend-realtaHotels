import { call, put } from "@redux-saga/core/effects";
import ApiPriceItems from "@/redux/Services/Booking/apimaster";
import { priceItemsRequestSucceed,priceItemsRequestFailed } from "../../Actions/Booking/PriceItems";

function * handelPriceItems():any{
    try {
        const result = yield call(ApiPriceItems.getAll)
        yield put (priceItemsRequestSucceed(result.data))
    }catch(error:any){
        yield put (priceItemsRequestFailed(error))
    }
}

export {handelPriceItems}