import { call, put } from "redux-saga/effects";
import {
  doAddDepartmentFailed,
  doAddDepartmentSucceed,
  doDeleteDepartmentFailed,
  doDeleteDepartmentSucceed,
  doDepartmentRequestFailed,
  doDepartmentRequestSucceed,
  doDepartmentsRequestFailed,
  doDepartmentsRequestSucceed,
  doUpdateDepartmentFailed,
  doUpdateDepartmentSucceed,
} from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import axios from "axios";
import { API } from "@/redux/Services/HumanResources/apiService";
import ActionType from "@/redux/Constant/HumanResources/ActionType";
import {
  doUsersRequestFailed,
  doUsersRequestSucceed,
} from "@/redux/Actions/Users/reduceActions";

function* handleUsers(): any {
  try {
    const res = yield axios(API("get", "user"));

    yield put(doUsersRequestSucceed(res.data));

    return res.data.result;
  } catch (error: any) {
    const delay = (time: any) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield put(doUsersRequestFailed(error.response.data.message));
    yield call(delay, 6000);
    yield put(doUsersRequestFailed(null));
  }
}

export { handleUsers };
