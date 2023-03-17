import axios from '../../../config/http-common'

const findVendorProduct = async() =>{
    try{
        const res = await axios.get(`/vendor-product/`)
        return res;
    }catch(e:any){
        return e.message
    }
}

const addVendorProduct = async(data:any) =>{
    try{
        const res = await axios.post(`/vendor-product/addProduct/${data.vendid}`,data)
        return res
    }catch(e:any){
        return e.message
    }
}

const vendproService = {
    findVendorProduct,
    addVendorProduct
}

export default vendproService