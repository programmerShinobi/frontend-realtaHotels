import {
	FETCH_BANKS_SUCCEED,
	FETCH_BANKS_FAILED,
	UPDATE_BANK_SUCCEED,
	UPDATE_BANK_FAILED,
	INSERT_BANK_SUCCEED,
	INSERT_BANK_FAILED,
	DELETE_BANK_SUCCEED,
	DELETE_BANK_FAILED,
} from "@/redux/Constant/payment/bank";
import bankService from "@/redux/Services/payment/bank";
import { call, put } from "redux-saga/effects";

export function* fetchBanks(action: any): any {
	const result = yield call(bankService.getAll, action.data);
	try {
		yield put({
			type: FETCH_BANKS_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: FETCH_BANKS_FAILED,
			error: error,
		});
	}
}

export function* updateBank(action: any): any {
	const result = yield call(bankService.update, action.data);
	try {
		yield put({
			type: UPDATE_BANK_SUCCEED,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: UPDATE_BANK_FAILED,
			error: error,
		});
	}
}

export function* insertBank(action: any): any {
	const result = yield call(bankService.insert, action.data);
	try {
		yield put({
			type: INSERT_BANK_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: INSERT_BANK_FAILED,
			error: error,
		});
	}
}

export function* deleteBank(action: any): any {
	const result = yield call(bankService.remove, action.data);
	try {
		yield put({
			type: DELETE_BANK_SUCCEED,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: DELETE_BANK_FAILED,
			error: error,
		});
	}
}
