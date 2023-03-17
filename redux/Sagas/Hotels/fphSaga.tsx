import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../../Services/Hotels/apiHotel";
import {
  doGetFaciPriceHistorySucced,
  doGetFaciPriceHistoryFaied,
} from "../../Actions/Hotels/actionFPH";

function* handlerFPH(): any {
  try {
    const result = yield call(ApiHotel.getFaciPricehistory);
    yield put(doGetFaciPriceHistorySucced(result.data));
  } catch (error) {
    yield put(doGetFaciPriceHistoryFaied(error));
  }
}

export { handlerFPH };
