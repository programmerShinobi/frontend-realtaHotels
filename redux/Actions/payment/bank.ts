import { Bank } from "@/lib/interfaces";
import {
	DELETE_BANK,
	FETCH_BANKS,
	INSERT_BANK,
	UPDATE_BANK,
} from "@/redux/Constant/payment/bank";

export const fetchBanks = (data?: any) => {
	return {
		type: FETCH_BANKS,
		data
	};
};

export const updateBank = (data: Bank) => {
	return {
		type: UPDATE_BANK,
		data,
	};
};

export const insertBank = (data: Bank) => {
	return {
		type: INSERT_BANK,
		data,
	};
};

export const deleteBank = (data: Bank) => {
	return {
		type: DELETE_BANK,
		data,
	};
};
