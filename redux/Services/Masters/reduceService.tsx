import axios from "../../../config/http-common";

const getAll = async () => {
    try {
        const result: any = await axios.get("/region");
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getId = async (id: number) => {
    try {
        const result: any = await axios.get(`/region/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const create = async (data: any) => {
    try {
        const result: any = await axios.post("/region/save/", data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const update = async (data: any) => {
    const id = parseInt(data.regionCode);
    try {
        const result: any = await axios.put(`/region/edit/${id}`, data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const remove = async (id: number) => {
    try {
        const result: any = await axios.delete(`/region/delete/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}
// ============== country ======== //
const getAll2 = async () => {
    try {
        const result: any = await axios.get("/countries");
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getId2 = async (id: number) => {
    try {
        const result: any = await axios.get(`/countries/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const create2 = async (data: any) => {
    try {
        const result: any = await axios.post("/countries/save/", data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const update2 = async (data: any) => {
    try {
        const result: any = await axios.put(`/countries/edit/${data.country_id}`, data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const remove2 = async (id: number) => {
    try {
        const result: any = await axios.delete(`/countries/delete/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

// ====== prov ====//
const getAll3 = async () => {
    try {
        const result: any = await axios.get("/provinces");
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getId3 = async (id: number) => {
    try {
        const result: any = await axios.get(`/provinces/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const create3 = async (data: any) => {
    try {
        const result: any = await axios.post("/provinces/save/", data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const update3 = async (data: any) => {
    const id = parseInt(data.provId);
    try {
        const result: any = await axios.put(`/provinces/edit/${id}`, data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const remove3 = async (id: number) => {
    try {
        const result: any = await axios.delete(`/provinces/delete/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}


// addr
const getAll4 = async () => {
    try {
        const result: any = await axios.get("/address");
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getId4 = async (id: number) => {
    try {
        const result: any = await axios.get(`/address/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const create4 = async (data: any) => {
    try {
        const result: any = await axios.post("/address/save/", data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const update4 = async (data: any) => {
    const id = parseInt(data.addrId);
    try {
        const result: any = await axios.put(`/address/edit/${id}`, data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const remove4 = async (id: number) => {
    try {
        const result: any = await axios.delete(`/address/delete/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}


// Policy
const getAll5 = async () => {
    try {
        const result: any = await axios.get("/policy");
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getId5 = async (id: number) => {
    try {
        const result: any = await axios.get(`/policy/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const create5 = async (data: any) => {
    try {
        const result: any = await axios.post("/policy/save/", data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const update5 = async (data: any) => {
    const id = parseInt(data.poliId);
    try {
        const result: any = await axios.put(`/policy/edit/${id}`, data);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const remove5 = async (id: number) => {
    try {
        const result: any = await axios.delete(`/policy/delete/${id}`);
        return result;
    } catch (error: any) {
        return error.message;
    }

}
    // cagro
    const getAll6 = async () => {
        try {
            const result: any = await axios.get("/category-group");
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const getId6 = async (id: number) => {
        try {
            const result: any = await axios.get(`/category-group/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const create6 = async (data: any) => {
        try {
            const result: any = await axios.post("/category-group/upload/firebase/", data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const update6 = async (data: any) => {
        const id = parseInt(data.cagroId);
        try {
            const result: any = await axios.put(`/category-group/edit/${id}`, data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const remove6 = async (id: number) => {
        try {
            const result: any = await axios.delete(`/category-group/delete/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }
    // Price items
    const getAll7 = async () => {
        try {
            const result: any = await axios.get("/price-items");
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const getId7 = async (id: number) => {
        try {
            const result: any = await axios.get(`/price-items/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const create7 = async (data: any) => {
        try {
            const result: any = await axios.post("/price-items/save/", data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const update7 = async (data: any) => {
        const id = parseInt(data.pritId);
        try {
            const result: any = await axios.put(`/price-items/edit/${id}`, data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const remove7 = async (id: number) => {
        try {
            const result: any = await axios.delete(`/price-items/delete/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }
    // Service Task
    const getAll8 = async () => {
        try {
            const result: any = await axios.get("/service-task");
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const getId8 = async (id: number) => {
        try {
            const result: any = await axios.get(`/service-task/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const create8 = async (data: any) => {
        try {
            const result: any = await axios.post("/service-task/save/", data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const update8 = async (data: any) => {
        const id = parseInt(data.setaId);
        try {
            const result: any = await axios.put(`/service-task/edit/${id}`, data);
            return result;
        } catch (error: any) {
            return error.message;
        }
    }

    const remove8 = async (id: number) => {
        try {
            const result: any = await axios.delete(`/service-task/delete/${id}`);
            return result;
        } catch (error: any) {
            return error.message;
        }

    }

    const ReduceService = {
        getAll,
        getId,
        create,
        update,
        remove,

        // country
        getAll2,
        getId2,
        create2,
        update2,
        remove2,

        // === prov ===//
        getAll3,
        getId3,
        create3,
        update3,
        remove3,

        // ==== addr
        getAll4,
        getId4,
        create4,
        update4,
        remove4,

        // ==== Policy
        getAll5,
        getId5,
        create5,
        update5,
        remove5,

        // ==== Cagro
        getAll6,
        getId6,
        create6,
        update6,
        remove6,

        // ==== Price items
        getAll7,
        getId7,
        create7,
        update7,
        remove7,

        // ==== Service Task
        getAll8,
        getId8,
        create8,
        update8,
        remove8
    }
    export default ReduceService;
