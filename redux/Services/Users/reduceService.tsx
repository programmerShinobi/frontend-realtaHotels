import axios from "../../../config/http-common";

const getAll = async () => {
    try {
        const result:any = await axios.get("/users");
        if (!result) {
            throw new Error("Axios get problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const getId = async (id:number) => {
    try {
        const result:any = await axios.get(`/users/findOneJoinAllUser/${id}`);
        if (!result) {
            throw new Error("Axios get problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const create = async (data:any) => {
    try {
        const result:any = await axios.post("/users/createAllJoinToUsers", data);
        if (!result) {
            throw new Error("Axios post problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const update = async (data:any) => {
    const id = parseInt(data.userId);
    try {
        const result:any = await axios.put(`/users/updateAllJoinToUsers/${id}`, data);
        if (!result) {
            throw new Error("Axios put problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const updatePhoto = async (data:any) => {
    const id = parseInt(data.usproId);
    try {
        const result:any = await axios.put(`/userprofiles/userPhotoProfiles/${id}`, data);
        if (!result) {
            throw new Error("Axios put problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const remove = async (id:number) => {
    try {
        const result:any = await axios.delete(`/users/deleteAllJoinToUsers/${id}`);
        if (!result) {
            throw new Error("Axios delete problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const login = async (data:any) => {
    try {
        const result:any = await axios.post("auth/login", data);
        if (!result) {
            throw new Error("Axios post problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const register = async (data:any) => {
    try {
        const result:any = await axios.post("auth/register", data);
        if (!result) {
            throw new Error("Axios post problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const getAllRoles = async () => {
    try {
        const result:any = await axios.get("/roles");
        if (!result) {
            throw new Error("Axios get problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const getIdRole = async (id:number) => {
    try {
        const result:any = await axios.get(`/roles/${id}`);
        if (!result) {
            throw new Error("Axios get problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const createRole = async (data:any) => {
    try {
        const result:any = await axios.post("/roles", data);
        if (!result) {
            throw new Error("Axios post problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const updateRole = async (data:any) => {
    const id:number = parseInt(data.roleId);
    try {
        const result: any = await axios.put(`/roles/${id}`, data);
        if (!result) {
            throw new Error("Axios put problem")
        }
        return result;
    } catch (error:any) {
        return error.message;
    }
}

const removeRole = async (id:number) => {
    try {
        const result:any = await axios.delete(`/roles/${id}`);
        if (!result) {
            throw new Error("Axios delete problem")
        }
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
    register,
    getAllRoles,
    getIdRole,
    createRole,
    updateRole,
    removeRole
}

export default ReduceService;