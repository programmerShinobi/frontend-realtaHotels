import axios from '../../../config/http-common'

const getStocks = async() =>{
    try{
        const res = await axios.get('/stocks')
        return res
    }catch(e:any){
        return e.message
    }
}
const createStocks = async(data:any) =>{
    try{
        const res = await axios.post('/stocks',data)
        return res
    }catch(e:any){
        return e.message
    }
}

const updateStocks = async(data:any)=>{
    try{
        const res = await axios.put(`/stocks/${data.stockId}`,data)
        return res
    }catch(e:any){
        return e.message
    }
}
const stockService = {
    getStocks,
    createStocks,
    updateStocks
}

export default stockService