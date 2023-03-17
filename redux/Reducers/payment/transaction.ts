import { Transaction } from "@/lib/interfaces";
import {
	FETCH_TRANSACTIONS,
	FETCH_TRANSACTIONS_FAILED,
	FETCH_TRANSACTIONS_SUCCEED,
	CREATE_TRANSACTION,
	CREATE_TRANSACTION_SUCCEED,
	CREATE_TRANSACTION_FAILED,
} from "@/redux/Constant/payment/transaction";

const initialState: {
	page: number;
	totalTrx: number;
	total: number;
	transactions: Transaction[];
	lastPage: number;
	message: string;
	status: number;
} = {
	page: 1,
	totalTrx: 0,
	total: 0,
	transactions: [],
	lastPage: 0,
	message: "",
	status: 0,
};

export default function transactionReducer(state = initialState, action: any) {
	switch (action.type) {
		// FETCH ALL
		case FETCH_TRANSACTIONS:
			return {
				...state,
			};
		case FETCH_TRANSACTIONS_FAILED:
			return {
				...state,
				status: action.data.status,
				message: action.data.message,
			};
		case FETCH_TRANSACTIONS_SUCCEED:
			return {
				...state,
				total: action.data.total,
				totalTrx: action.data.totalTrx,
				transactions: action.data.result,
				page: action.data.page,
				status: action.data.status,
				message: action.data.message,
				lastPage: action.data.lastPage,
			};

		// CREATE
		case CREATE_TRANSACTION:
			return {
				...state,
			};
		case CREATE_TRANSACTION_SUCCEED:
			return {
				...state,
				transactions: [...state.transactions, action.data.result],
				message: action.data.message,
				status: action.data.status,
			};
		case CREATE_TRANSACTION_FAILED:
			return {
				...state,
				message: action?.data?.message,
				status: action?.data?.status,
			};
		default:
			return state;
	}
}
