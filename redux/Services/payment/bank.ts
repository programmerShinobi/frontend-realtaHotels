import axios from "axios";
import { Bank } from "@/lib/interfaces";
import { BANK_URL } from "@/lib/urls";

const getAll = async (payload: any): Promise<any> => {
	const limitParams = payload.limit? `&limit=${payload.limit}` : `&limit=`
	const pageParams = payload.page ? `&page=${payload.page}` : `&page=`
	const searchParams = payload?.keyword ? `keyword=${payload.keyword}` : `keyword=`
	
	return await axios.get(`${BANK_URL}/filter?${searchParams}${limitParams}${pageParams}`);
};

const insert = async (payload: Bank): Promise<any> => {
	return await axios.post(BANK_URL, payload);
};

const update = async (payload: Bank): Promise<any> => {
	return await axios.put(`${BANK_URL}/${payload.bankCode}`, payload);
};

const remove = async (payload: Bank): Promise<any> => {
	return await axios.delete(`${BANK_URL}/${payload.bankCode}`);
};

const bankService = {
	getAll,
	insert,
	update,
	remove,
};

export default bankService;
