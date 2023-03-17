import { call, put } from "redux-saga/effects";
import ReduceMenusRestoService from "@/redux/Services/Resto/reduceService";
import {
  // doAddPhotosRequestFailed,
  // doAddPhotosRequestSucced,
  doCardClientRequestFailed,
  doCardClientRequestSucceed,
  doCreateOrderMenusDetailFailed,
  doCreateOrderMenusDetailSucceed,
  doCreateOrderMenusFailed,
  doCreateOrderMenusSucceed,
  doCreateRestoMenusFailed,
  doCreateRestoMenusSucceed,
  doDeleteRestoMenusFailed,
  doDeleteRestoMenusSucceed,
  doOrderMenusDetailRequestFailed,
  doOrderMenusDetailRequestSucceed,
  doOrderMenusRequestFailed,
  doOrderMenusRequestSucceed,
  doPhotosRequestFailed,
  doPhotosRequestSucceed,
  doRestoMenuRequestFailled,
  doRestoMenuRequestSucceed,
  doRestoMenusRequestFailed,
  doRestoMenusRequestSucceed,
  doUpdatePhotosRequestFailed,
  doUpdatePhotosRequestSucced,
  doUpdateRestoMenusFailed,
  doUpdateRestoMenusSucceed,
  orderMenusIdAkhirRequestFailed,
  orderMenusIdAkhirRequestSucced,
  orderMenusOneAkhirRequestFailed,
  orderMenusOneAkhirRequestSecced,
  restoMenusPhotosUrlRequestFailed,
  restoMenusPhotosUrlRequestSucced,
} from "@/redux/Actions/Resto/reduceActions";
import { result } from "lodash";

// GET URL PHOTOS

function* handleRestoMenusPhotosUrl(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getUrlRestoPhotos);
    yield put(restoMenusPhotosUrlRequestSucced(result.data));
  } catch (error) {
    yield put(restoMenusPhotosUrlRequestFailed(error));
  }
}

// GET ID AKHIR ORDER MENUS

function* handleOrderMenusIdAkhir(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getIdAkhirOrderMenus);
    yield put(orderMenusIdAkhirRequestSucced(result.data));
  } catch (error: any) {
    yield put(orderMenusIdAkhirRequestFailed(error));
  }
}

//GET ORDER MENUS ONE AKHIR

function* handeleOrderMenusOneAkhir(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getOrderMenusAkhir);
    yield put(orderMenusOneAkhirRequestSecced(result.data));
    // console.log(result.data);
  } catch (error: any) {
    yield put(orderMenusOneAkhirRequestFailed(error));
  }
}

// GET ORDER MENUS

function* handleOrderMenus(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getOrderMenus);
    yield put(doOrderMenusRequestSucceed(result.data));
  } catch (error) {
    yield put(doOrderMenusRequestFailed(error));
  }
}

// CREATE ORDER MENUS

function* handleAddOrderMenus(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.createOrderMenus, action.payload);
    yield put(doCreateOrderMenusSucceed(result.data));
  } catch (error: any) {
    yield put(doCreateOrderMenusFailed(error));
  }
}

// get order detail
function* handleOrderMenuDetail(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getOrderMenus);
    yield put(doOrderMenusDetailRequestSucceed(result.data));
  } catch (error) {
    yield put(doOrderMenusDetailRequestFailed(error));
  }
}

// CREATE ORDER DETAIL
function* handleAddOrderDetail(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.createOrderDetail, action.payload);
    yield put(doCreateOrderMenusDetailSucceed(result.data));
  } catch (error: any) {
    yield put(doCreateOrderMenusDetailFailed(error));
  }
}

//GET ALL PHOTO
// function* handlePhotoMenus(): any {
//   try {
//     const result = yield call(ReduceMenusRestoService.getRestoPhoto);
//     yield put(doPhotosRequestSucceed(result.data));
//   } catch (error: any) {
//     yield put(doPhotosRequestFailed(error));
//   }
// }

// CREATE PHOTO
function* handleCreatePhotoMenus(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.createPhoto, action.payload);
    yield put(doPhotosRequestSucceed(result.data));
  } catch (error: any) {
    yield put(doPhotosRequestFailed(error));
  }
}

// UPDATE PHOTO
function* handleUpdatePhotoMenus(): any {
  try {
    const result = yield call(ReduceMenusRestoService.updatePhotos.action.payload);
    yield put(doUpdatePhotosRequestSucced(result.data));
  } catch (error: any) {
    yield put(doUpdatePhotosRequestFailed(error));
  }
}

//GET ALL CLIENT

function* handleRestoMenusCard(): any {
  try {
    const result = yield call(ReduceMenusRestoService.getCardClient);
    yield put(doCardClientRequestSucceed(result.data));
    // console.log(result);
  } catch (error: any) {
    yield put(doCardClientRequestFailed(error));
  }
}

// GET ALL
function* handleRestoMenus(): any {
  try {
    const result: any = yield call(ReduceMenusRestoService.getAll);
    yield put(doRestoMenusRequestSucceed(result.data));
    // console.log(result.data);
  } catch (error: any) {
    yield put(doRestoMenusRequestFailed(error));
  }
}

// GET ONE
function* handleRestoMenu(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.getId, action.payload);
    yield put(doRestoMenuRequestSucceed(result.data));
  } catch (error: any) {
    yield put(doRestoMenuRequestFailled(error));
  }
}

// CREATE
function* handleCreateRestoMenus(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.create, action.payload);
    yield put(doCreateRestoMenusSucceed(result.data));
  } catch (error: any) {
    yield put(doCreateRestoMenusFailed(error));
  }
}

// UPDATE

function* handleUpdateRestoMenus(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.update, action.payload);
    yield put(doUpdateRestoMenusSucceed(result));
  } catch (error: any) {
    yield put(doUpdateRestoMenusFailed(error));
  }
}

// DELETE

function* handleDeleteRestomenus(action: any): any {
  try {
    const result = yield call(ReduceMenusRestoService.remove, action.payload);
    yield put(doDeleteRestoMenusSucceed(action.payload));
  } catch (error: any) {
    yield put(doDeleteRestoMenusFailed(error));
  }
}

export {
  handleOrderMenusIdAkhir,
  handeleOrderMenusOneAkhir,
  handleOrderMenuDetail,
  handleOrderMenus,
  handleAddOrderMenus,
  handleAddOrderDetail,
  // handlePhotoMenus,
  handleUpdatePhotoMenus,
  handleCreatePhotoMenus,
  handleRestoMenusCard,
  handleRestoMenus,
  handleRestoMenusPhotosUrl,
  handleRestoMenu,
  handleUpdateRestoMenus,
  handleCreateRestoMenus,
  handleDeleteRestomenus,
};
