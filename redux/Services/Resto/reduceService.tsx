import axios from "../../../config/http-common";

// get url resto photos

const getUrlRestoPhotos = async () => {
  try {
    const result: any = await axios.get("/resto-menus-photos/url");
    return result;
  } catch (error: any) {
    return error.messege;
  }
};

// get id akhir order Menus
const getIdAkhirOrderMenus = async () => {
  try {
    const result = await axios.get("/order-menus/lastId");
    return result;
  } catch (error: any) {
    return error.messege;
  }
};

//get one order menus
const getOrderMenusAkhir = async () => {
  try {
    const result = await axios.get("/order-menus/last");
    // console.log("hayREducers", result)
    return result;
  } catch (error: any) {
    return error.messege;
  }
};

// get all order menus

const getOrderMenus = async () => {
  try {
    const result: any = await axios.get("/order-menus");
    return result;
  } catch (error: any) {
    return error.message;
  }
};

//order Menus create
const createOrderMenus = async (data: any) => {
  try {
    const result: any = await axios.post("order-menus", data);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

// order detail get

const getAllOrderDetail = async () => {
  try {
    const result: any = await axios.get("/order-menu-detail");
    return result;
  } catch (error: any) {
    return error.message;
  }
};

//order details create
const createOrderDetail = async (data: any) => {
  try {
    const result: any = await axios.post("order-menu-detail", data);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

// Photos
// const getRestoPhoto = async () => {
//   try {
//     const result: any = await axios.get("resto-menus-photos");
//     return result;
//   } catch (error: any) {
//     return error.message;
//   }
// };

//photos create
const createPhoto = async (data: any) => {
  try {
    const result = await axios.post("resto-menus-photos", data);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

// Photos delete
const removePhoto = async (id: number) => {
  try {
    const result = axios.delete(`/resto-menus-photos/${id}`);
  } catch (error: any) {
    return error.message;
  }
};

// photos update
const updatePhotos = async (data: any) => {
  const id = parseInt(data.remeId);
  try {
    const result = axios.put(`/resto-menus-photos/${id}`);
  } catch (error: any) {}
};

// Cart
const getCardClient = async () => {
  try {
    const result: any = await axios.get("/restoMenus");
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const getAll = async () => {
  try {
    const result: any = await axios.get("/resto");
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const getId = async (id: number) => {
  try {
    const result: any = await axios.get(`/resto/${id}`);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const create = async (data: any) => {
  try {
    const result: any = await axios.post("/resto", data);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const update = async (data: any) => {
  const id = parseInt(data.remeId);
  try {
    const result: any = await axios.put(`/resto/${id}`, data);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const remove = async (id: number) => {
  try {
    const result: any = axios.delete(`/resto/${id}`);
    return result;
  } catch (error: any) {
    return error.message;
  }
};

const ReduceMenusRestoService: any = {
  getUrlRestoPhotos,
  getIdAkhirOrderMenus,
  getAllOrderDetail,
  getOrderMenusAkhir,
  getOrderMenus,
  // getRestoPhoto,
  createPhoto,
  updatePhotos,
  removePhoto,
  getAll,
  getId,
  create,
  remove,
  createOrderMenus,
  update,
  createOrderDetail,
  getCardClient,
};

export default ReduceMenusRestoService;
