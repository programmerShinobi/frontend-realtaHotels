import { UserAccount } from "@/lib/interfaces";
import { USER_ACCOUNT_URL } from "@/lib/urls";
import axios from "axios";

const getAll = async () => {
    return await axios.get(USER_ACCOUNT_URL);
};

const getbyUser = async (data: UserAccount) => {
    // nanti ganti jadi UserAccount data typenya
    return await axios.get(`${USER_ACCOUNT_URL}/filter?userId=${data.userId}`)
};

const insert = async (data: UserAccount) => {
    return await axios.post(`${USER_ACCOUNT_URL}/add`, data)
}

const update = async (data: UserAccount) => {
    return await axios.put(`${USER_ACCOUNT_URL}/${data.accountNumber}`, data)//.then(result=>console.log('u pservcie', result)).catch(error=>console.log(error))
}

const remove = async (data: any) => {
    return await axios.delete(`${USER_ACCOUNT_URL}/${data.accountNumber}`)
}

const check = async (data: UserAccount) => {
    return await axios.post(`${USER_ACCOUNT_URL}/auth`, data)
}
const userAccountService = {
    getAll,
    getbyUser,
    insert,
    update,
    remove,
    check
};

export default userAccountService;
