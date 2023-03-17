import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../../Services/Hotels/apiHotel";
import {
  doHotelAdminReqSuccess,
  doHotelAdminReqFailed,
  doInsertHotelSuccess,
  doInsertHotelFailed,
  doDelHotelFailed,
  doDelHotelSucced,
  doUpdateHotelSucces,
  doUpdateHotelFailed,
  doAddrSearchReqSuccess,
  doAddrSearchReqFailed,
} from "../../Actions/Hotels/actionHotelAdmin";

function* handlerHotelAdmin(): any {
  // jika di postman menampilkan result data
  try {
    const result = yield call(ApiHotel.getHotelAdmin);
    yield put(doHotelAdminReqSuccess(result.data));
  } catch (err) {
    yield put(doHotelAdminReqFailed(err));
  }
}

function* handlerInsertHotel(action: any): any {
  // jika return di postmane a cuma meampilkan string tidak pakai result
  try {
    const hasil = yield call(ApiHotel.insertHotel, action.payload);
    yield put(doInsertHotelSuccess(hasil.data.result));
  } catch (err) {
    yield put(doInsertHotelFailed(err));
  }
}

function* handlerDeleteHotel(action: any) {
  try {
    yield call(ApiHotel.removeHotel, action.payload);
    yield put(doDelHotelSucced(action.payload));
  } catch (err) {
    yield put(doDelHotelFailed(err));
  }
}

function* handlerUpdateHotel(action: any) {
  try {
    yield call(ApiHotel.updateHotel, action.payload);
    yield put(doUpdateHotelSucces(action.payload));
  } catch (err) {
    yield put(doUpdateHotelFailed(err));
  }
}

// handlr get addrHotel
function* handlerHotelAddr(): any {
  try {
    const result = yield call(ApiHotel.getAddrSearch);
    yield put(doAddrSearchReqSuccess(result.data));
  } catch (error) {
    yield put(doAddrSearchReqFailed(error));
  }
}

export {
  handlerHotelAdmin,
  handlerInsertHotel,
  handlerDeleteHotel,
  handlerUpdateHotel,
  handlerHotelAddr,
};
