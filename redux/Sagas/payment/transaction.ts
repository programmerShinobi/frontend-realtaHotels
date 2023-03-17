import {
	FETCH_TRANSACTIONS_SUCCEED,
	FETCH_TRANSACTIONS_FAILED,
	CREATE_TRANSACTION_SUCCEED,
	CREATE_TRANSACTION_FAILED,
} from "@/redux/Constant/payment/transaction";
import transactionService from "@/redux/Services/payment/transaction";
import { call, put } from "redux-saga/effects";

export function* fetchTransactions(action: any): any {
	const result = yield call(transactionService.getAll, action);
	try {
		yield put({
			type: FETCH_TRANSACTIONS_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: FETCH_TRANSACTIONS_FAILED,
			message: error,
		});
	}
}

export function* createTransaction(action: any): any {
	const result = yield call(transactionService.create, action.data);
	try {
		yield put({
			type: CREATE_TRANSACTION_SUCCEED,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: CREATE_TRANSACTION_FAILED,
			data: result?.data
		});
	}
}
