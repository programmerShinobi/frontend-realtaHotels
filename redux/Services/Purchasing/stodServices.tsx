import axios from '../../../config/http-common'

const getAllStockDetail = async() =>{
    try{
        const res = await axios.get('/stock-detail')
        return res
    }catch(e:any){
        return e.message
    }
}

const getFaciName = async() =>{
    try{
        const res = await axios.get('/stock-detail/facilities')
        return res
    }catch(e:any){
        return e.message
    }
}
const updateStockDetail = async(data:any) =>{
    try{
        const res = await axios.put(`/stock-detail/${data.stodId}`, data)
    }catch(e:any){
        return e.message
    }
}
const stodServices = {
    getAllStockDetail,
    getFaciName,
    updateStockDetail
}

export default stodServices