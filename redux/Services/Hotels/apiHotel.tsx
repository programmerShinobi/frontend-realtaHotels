import axios from "../../../config/http-common";

const getCardHotel = async () => {
  try {
    const result = await axios.get("/hotel/card");
    return result;
  } catch (err) {
    return err;
  }
};

const getFaciAllHotel = async () => {
  try {
    const result = await axios.get("/facility/faciall");
    return result;
  } catch (err) {
    return err;
  }
};

const getHore = async () => {
  try {
    const result = await axios.get("/hore/alluser");
    return result;
  } catch (err) {
    return err;
  }
};

// GET VIEW HOTEL ADMIN
const getHotelAdmin = async () => {
  try {
    const result = await axios.get("/hotel/view");
    return result;
  } catch (err) {
    return err;
  }
};

// INSERT HOTEL
const insertHotel = async (data: any) => {
  try {
    const result = await axios.post("/hotel/insert", data);
    return result;
  } catch (err) {
    return err;
  }
};

// delete hotel
const removeHotel = async (id: any) => {
  try {
    const result = await axios.delete(`hotel/delete/${id}`);
    return result;
  } catch (err) {
    return err;
  }
};

// UPDATE HOTEL
const updateHotel = async (data: any) => {
  try {
    const result = await axios.put(`/hotel/${data.hotelId}`, data);
    return result;
  } catch (err) {
    return err;
  }
};

// get faci
const getFaciAdmin = async () => {
  try {
    const result = await axios.get("/facility/view");
    return result;
  } catch (err) {
    return err;
  }
};

// get max idroom
const getMaxIdRoom = async () => {
  try {
    const result = await axios.get("/facility/maxroomid");
    return result;
  } catch (error) {
    return error;
  }
};

// insert faci
const insertFaci = async (data: any) => {
  try {
    const result = await axios.post("/facility/insert", data);
    return result;
  } catch (error) {
    return error;
  }
};

// UPDATE FACI
const updateFaci = async (data: any) => {
  try {
    const result = await axios.put(`/facility/${data.faci_id}`, data);
    return result;
  } catch (err) {
    return err;
  }
};

// GET SEARCHH ADDR
const getAddrSearch = async () => {
  try {
    const result = await axios.get("/hotel/address");
    return result;
  } catch (error) {
    return error;
  }
}; // delete faci
const removeFaci = async (id: any) => {
  try {
    const result = await axios.delete(`/facility/delete/${id}`);
    return result;
  } catch (err) {
    return err;
  }
};

// get fapho
const getFaphoAdmin = async () => {
  try {
    const result = await axios.get("/facility-photos/view");
    return result;
  } catch (err) {
    return err;
  }
};

// get fph
const getFaciPricehistory = async () => {
  try {
    const result = await axios.get("/facility-price-history/view");
    return result;
  } catch (error) {
    return error;
  }
};

// insert fapho
const uploadFapho = async (data: any) => {
  try {
    const result = await axios.post("/facility-photos/upload/firebase", data);
    return result;
  } catch (error) {
    return error;
  }
};

// const uploadFapho = async (file: File, faphoFaci: any) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("faphoFaci", faphoFaci);
//     const result = await axios.post("/facility-photos/upload", file, faphoFaci);
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

const ApiHotel = {
  getCardHotel,
  getFaciAllHotel,
  getHore,
  getHotelAdmin,
  insertHotel,
  removeHotel,
  updateHotel,
  getFaciAdmin,
  getMaxIdRoom,
  insertFaci,
  getAddrSearch,
  removeFaci,
  getFaphoAdmin,
  getFaciPricehistory,
  updateFaci,
  uploadFapho,
};

export default ApiHotel;
