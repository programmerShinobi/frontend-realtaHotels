import {
	FETCH_ACCOUNTS_SUCCEED,
	FETCH_ACCOUNTS_FAILED,
	FETCH_ACCOUNT_SUCCEED,
	FETCH_ACCOUNT_FAILED,
	CREATE_ACCOUNT_SUCCEED,
	CREATE_ACCOUNT_FAILED,
	UPDATE_ACCOUNT_SUCCEED,
	UPDATE_ACCOUNT_FAILED,
	DELETE_ACCOUNT_SUCCEED,
	DELETE_ACCOUNT_FAILED,
	CHECK_SECURED_KEY_SUCCEED,
	CHECK_SECURED_KEY_FAILED,
} from "@/redux/Constant/payment/userAccount";
import userAccountService from "@/redux/Services/payment/userAccount";
import { put, call } from "redux-saga/effects";

export function* fetchUserAccounts(): any {
	const result = yield call(userAccountService.getAll);
	try {
		yield put({
			type: FETCH_ACCOUNTS_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: FETCH_ACCOUNTS_FAILED,
			data: result.data,
		});
	}
}

export function* fetchUserAccountBy(action: any): any {
	const result = yield call(userAccountService.getbyUser, action.data);
	const delay = (time: any) =>
		new Promise((resolve) => setTimeout(resolve, time));
	try {
		yield put({
			type: FETCH_ACCOUNT_SUCCEED,
			data: result.data,
		});
		yield call(delay, 2000);
	} catch (error) {
		yield put({
			type: FETCH_ACCOUNT_FAILED,
			data: result.data,
		});
		yield call(delay, 2000);
	}
}

export function* createUserAccount(action: any): any {
	const result = yield call(userAccountService.insert, action.data);
	const delay = (time: any) =>
		new Promise((resolve) => setTimeout(resolve, time));
	try {
		yield put({
			type: CREATE_ACCOUNT_SUCCEED,
			data: result.data,
		});
		yield call(delay, 2000);
	} catch (error) {
		yield put({
			type: CREATE_ACCOUNT_FAILED,
			message: error,
		});
		yield call(delay, 2000);
	}
}

export function* updateUserAccount(action: any): any {
	const result = yield call(userAccountService.update, action.data);
	const delay = (time: any) =>
		new Promise((resolve) => setTimeout(resolve, time));
	try {
		yield put({
			type: UPDATE_ACCOUNT_SUCCEED,
			data: action.data,
			message: result.data?.message,
			status: result.data?.status,
		});
		yield call(delay, 2000);
	} catch (error) {
		yield put({
			type: UPDATE_ACCOUNT_FAILED,
			message: error,
			status: result?.data?.status,
		});
		yield call(delay, 2000);
	}
}

export function* deleteUserAccount(action: any): any {
	const result = yield call(userAccountService.remove, action.data);
	const delay = (time: any) =>
		new Promise((resolve) => setTimeout(resolve, time));
	console.log("result delete", result);
	try {
		yield put({
			type: DELETE_ACCOUNT_SUCCEED,
			data: action.data,
			message: result.data.message,
			status: result.data.status,
		});
		yield call(delay, 2000);
	} catch (error) {
		yield put({
			type: DELETE_ACCOUNT_FAILED,
			message: error,
		});
		yield call(delay, 2000);
	}
}

export function* checkSecuredKey(action: any): any {
	const result = yield call(userAccountService.check, action.data);
	const delay = (time: any) =>
		new Promise((resolve) => setTimeout(resolve, time));
	try {
		yield put({
			type: CHECK_SECURED_KEY_SUCCEED,
			data: result.data,
		});
		yield call(delay, 2000);
		
	} catch (error) {
		yield put({
			type: CHECK_SECURED_KEY_FAILED,
			data: result.data,
		});
		yield call(delay, 2000);
	}
}
