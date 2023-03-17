import {
	FETCH_FINTECH_SUCCEED,
	FETCH_FINTECH_FAILED,
	UPDATE_FINTECH_SUCCEED,
	UPDATE_FINTECH_FAILED,
	INSERT_FINTECH_SUCCEED,
	INSERT_FINTECH_FAILED,
	DELETE_FINTECH_SUCCEED,
	DELETE_FINTECH_FAILED,
} from "@/redux/Constant/payment/fintech";
import fintechService from "@/redux/Services/payment/fintech";
import { call, put } from "redux-saga/effects";

export function* fetchFintech(): any {
	const result = yield call(fintechService.getAll);
	try {
		yield put({
			type: FETCH_FINTECH_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: FETCH_FINTECH_FAILED,
			error: error,
		});
	}
}

export function* updateFintech(action: any): any {
	const result = yield call(fintechService.update, action.data);
	try {
		yield put({
			type: UPDATE_FINTECH_SUCCEED,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: UPDATE_FINTECH_FAILED,
			error: error,
		});
	}
}

export function* insertFintech(action: any): any {
	const result = yield call(fintechService.insert, action.data);
	try {
		yield put({
			type: INSERT_FINTECH_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: INSERT_FINTECH_FAILED,
			error: error,
		});
	}
}

export function* deleteFintech(action: any): any {
	const result = yield call(fintechService.remove, action.data);
	try {
		yield put({
			type: DELETE_FINTECH_SUCCEED,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: DELETE_FINTECH_FAILED,
			error: error,
		});
	}
}
