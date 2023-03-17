import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../../Services/Hotels/apiHotel";
import {
  doFaciAdminReqSuccess,
  doFaciAdminReqFailed,
  doInsertFaciFailed,
  doInsertFaciSucced,
  doDelFaciSucced,
  doDelFaciFailed,
  doUpdateFaciSucces,
  doUpdateFaciFailed,
} from "../../Actions/Hotels/actionFaciAdmin";
import {
  doMaxRoomIdReqFailed,
  doMaxRoomIdReqSucced,
} from "../../Actions/Hotels/actionMaxId";

function* handlerGetFaciAdmin(): any {
  try {
    const result = yield call(ApiHotel.getFaciAdmin);
    yield put(doFaciAdminReqSuccess(result.data));
  } catch (error) {
    yield put(doFaciAdminReqFailed(error));
  }
}

function* handlerGetMaxIdRoom(): any {
  try {
    const result = yield call(ApiHotel.getMaxIdRoom);
    yield put(doMaxRoomIdReqSucced(result.data));
  } catch (error) {
    yield put(doMaxRoomIdReqFailed(error));
  }
}
// insert
function* handlerInsertFaciAdmin(action: any): any {
  try {
    const hasil = yield call(ApiHotel.insertFaci, action.payload);
    // console.log("saga", hasil);
    yield put(doInsertFaciSucced(hasil.data.result));
    // console.log("hasil Faci", hasil);
  } catch (error) {
    yield put(doInsertFaciFailed(error));
  }
}
// delet
function* handlerDeleteFaci(action: any) {
  try {
    yield call(ApiHotel.removeFaci, action.payload);
    yield put(doDelFaciSucced(action.payload));
  } catch (err) {
    yield put(doDelFaciFailed(err));
  }
}

// update
function* handlerUpdateFaci(action: any) {
  try {
    yield call(ApiHotel.updateFaci, action.payload);
    yield put(doUpdateFaciSucces(action.payload));
  } catch (err) {
    yield put(doUpdateFaciFailed(err));
  }
}

export {
  handlerGetFaciAdmin,
  handlerGetMaxIdRoom,
  handlerInsertFaciAdmin,
  handlerDeleteFaci,
  handlerUpdateFaci,
};
