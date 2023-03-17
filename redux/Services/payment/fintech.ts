import axios from "axios";
import { Fintech } from "@/lib/interfaces";
import { FINTECH_URL } from "@/lib/urls";

const getAll = async (): Promise<any> => {
	return await axios.get(FINTECH_URL);
};

const insert = async (data: Fintech): Promise<any> => {
	return await axios.post(FINTECH_URL, data);
};

const update = async (data: Fintech): Promise<any> => {
	return await axios.put(`${FINTECH_URL}/${data.pagaEntityId}`, data);
};

const remove = async (data: Fintech): Promise<any> => {
	return await axios.delete(`${FINTECH_URL}/${data.pagaEntityId}`);
};

const fintechService = {
	getAll,
	insert,
	update,
	remove,
};

export default fintechService;
