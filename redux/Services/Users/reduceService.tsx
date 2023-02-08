import axios from "../../../config/http-common";

const getAll = async () => {
    try {
        const result:any = await axios.get("/users");
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const getId = async (id:number) => {
    try {
        const result:any = await axios.get(`/users/${id}`);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const create = async (data:any) => {
    try {
        const result:any = await axios.post("/users", data);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const update = async (data:any) => {
    const id = parseInt(data.userId);
    try {
        const result:any = await axios.put(`/users/${id}`, data);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const updatePhoto = async (data:any) => {
    const id = parseInt(data.usproId);
    try {
        const result:any = await axios.put(`/userprofiles/userPhotoProfiles/${id}`, data);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const remove = async (id:number) => {
    try {
        const result:any = await axios.delete(`/users/${id}`);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const login = async (data:any) => {
    try {
        const result:any = await axios.post("auth/login", data);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const register = async (data:any) => {
    try {
        const result:any = await axios.post("auth/register", data);
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const ReduceService:any = {
    getAll,
    getId,
    create,
    update,
    remove,
    updatePhoto,
    login,
    register
}

export default ReduceService;