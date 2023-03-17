import axios from '../../../config/http-common'
import axioss from '../../../config/http-common-for-upload'
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

const addStockPhoto = async (data:any) => {
    try{
        const res = await axioss.post('/stock-photo',{data})
        return res
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