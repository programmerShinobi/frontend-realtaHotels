import axios from "../../../config/http-common";

const getAll = async() =>{
    try{
        const result = await axios.get("/hotel/lastOrder");
        return result
    }catch(error:any){
        return  error.messege
    }
}

const Create = async(data:any)=>{
    try{
        const result = await axios.post("/bookingOrders/CreateBo",data)       
        return result
    }catch(error:any){
        return  error.messege
    }
}

const getInvoice = async() =>{
    try{
        const result = await axios.get("/hotel/invoice");
        return result
    }catch(error:any){
        return  error.messege
    }
}

const createBoex = async(data:any) => {
    try{
        const result = await axios.post('/booking-order-detail-extra/createBoexArray', data);
        return result
    }catch(error:any){
        return  error.messege
    }
}

const GetHistory = async(id:any) => {
    try{
        const result = await axios.get(`/booking-order-detail-extra/invoice/${id}`);
        return result
    }catch(error:any){
        return  error.messege
    }
}

const UpdateHistory = async(data:any) => {
    const id = parseInt(data.boorId)
    try{
        const result = await axios.put(`/bookingOrders/status/${id}`, data);
        return result
    }catch(error:any){
        return  error.messege
    }
}
const ApiOrderDetails = {
    getAll,
    Create,
    getInvoice,
    createBoex,
    GetHistory,
    UpdateHistory
}
export default ApiOrderDetails