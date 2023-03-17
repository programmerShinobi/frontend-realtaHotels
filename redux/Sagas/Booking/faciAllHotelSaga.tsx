import { call, put } from "@redux-saga/core/effects";
import {
  doAllFaciHotelReqFailed,
  doAllFaciHotelReqSuccess,
} from "../../Actions/Booking/actionFindFaciAllhotel";
import ApiHotel from "@/redux/Services/Booking/apiHotel";

function* handlerFaciAllHotel(): any {
  try {
    const result = yield call(ApiHotel.getFaciAllHotel);
    yield put(doAllFaciHotelReqSuccess(result.data));
  } catch (err) {
    yield put(doAllFaciHotelReqFailed(err));
  }
}

export { handlerFaciAllHotel };
