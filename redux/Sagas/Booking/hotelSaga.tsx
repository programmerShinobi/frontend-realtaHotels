import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "@/redux/Services/Booking/apiHotel";
import {
  doCardHotelReqSuccess,
  doCardHotelReqFailed,
} from "../../Actions/Booking/actionHotel";

function* handlerCardHotel(): any {
  try {
    const result = yield call(ApiHotel.getCardHotel);
    yield put(doCardHotelReqSuccess(result.data));
  } catch (err) {
    yield put(doCardHotelReqFailed(err));
  }
}

export { handlerCardHotel };
