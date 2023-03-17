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

// GET SEARCHH ADDR
const getAddrSearch = async () => {
  try {
    const result = await axios.get("/hotel/address");
    return result;
  } catch (error) {
    return error;
  }
};

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
};

export default ApiHotel;
