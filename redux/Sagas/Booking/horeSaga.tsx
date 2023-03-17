import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "@/redux/Services/Booking/apiHotel";
import {
  doGetHoreSucced,
  doGetHoreFaied,
} from "../../Actions/Booking/actionHore";

function* handlerHore(): any {
  try {
    const result = yield call(ApiHotel.getHore);
    yield put(doGetHoreSucced(result.data));
  } catch (error) {
    yield put(doGetHoreFaied(error));
  }
}

export { handlerHore };
