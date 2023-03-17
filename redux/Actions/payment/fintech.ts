import { Fintech } from "@/lib/interfaces";
import {
	FETCH_FINTECH,
	UPDATE_FINTECH,
	INSERT_FINTECH,
	DELETE_FINTECH,
} from "@/redux/Constant/payment/fintech";

export const fetchFintech = () => {
	return {
		type: FETCH_FINTECH,
	};
};

export const updateFintech = (data: Fintech) => {
	return {
		type: UPDATE_FINTECH,
		data,
	};
};

export const insertFintech = (data: Fintech) => {
	return {
		type: INSERT_FINTECH,
		data,
	};
};

export const deleteFintech = (data: Fintech) => {
	return {
		type: DELETE_FINTECH,
		data,
	};
};
