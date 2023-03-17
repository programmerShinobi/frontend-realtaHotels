import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../../Services/Hotels/apiHotel";
import {
  doGetFaphoSucced,
  doGetFaphoFaied,
  doUploadFaphoSucced,
  doUploadFaphoFailed,
} from "../../Actions/Hotels/actionFaphoAdmin";

function* handlerFapho(): any {
  try {
    const result = yield call(ApiHotel.getFaphoAdmin);
    yield put(doGetFaphoSucced(result.data));
  } catch (error) {
    yield put(doGetFaphoFaied(error));
  }
}

// insert
function* handlerUploadFapho(action: any): any {
  try {
    // console.log(Object.fromEntries(action.payload.entries()));
    const hasil = yield call(ApiHotel.uploadFapho, action.payload);
    yield put(doUploadFaphoSucced(hasil.data.result));
    // console.log(hasil);

    // console.log(hasil);
  } catch (error) {
    yield put(doUploadFaphoFailed(error));
  }
}

export { handlerFapho, handlerUploadFapho };
