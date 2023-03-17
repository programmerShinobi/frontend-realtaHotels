import axios from '../../../config/http-common'

const getAllStockPhoto = async () =>{
    try{
        const res = await axios.get('/stock-photo');
        return res
    }catch(e:any){
        return e.message
    }
}

const getStockPhotoDashboard =async () => {
    try{
        const res = await axios.get('/stock-photo/dashboard')
        return res
    }catch(e:any){
        return e.message
    }
}

const addStockPhoto = async (filedata:any, data:any) => {
    try{
        const res = await axios.post('/stock-photo',{filedata,data})
    }catch(e:any){
        return e.message
    }
}

const stockPhotoServices = {
    getAllStockPhoto,
    addStockPhoto,
    getStockPhotoDashboard
}

export default stockPhotoServices