import axios from '../../../config/http-common'

const findallVendor = async() =>{
    try{
        const res = await axios.get('/vendor');
        return res;
    }catch(e:any){
        return e.message
    }
}

const createVendor = async(data:any)=>{
    try{
        const res = await axios.post('/vendor', data)
        // console.log(res.data)
        return res
   

    }catch(e:any){
        return e.message
    }
}

const updateVendor = async (data:any)=>{
    try{
        const res = await axios.put(`/vendor/${data.vendorEntityId}`, data)
        return res
    }catch(e:any){
        return e.message
    }
}

const deleteVendor = async (data:any)=>{
    try{
        const res = await axios.delete(`/vendor/${data}`)
        // console.log(res)
        return res
    }catch(e:any){
        return e.message
    }
}

const vendorServ ={
    findallVendor,
    createVendor,
    updateVendor,
    deleteVendor
}

export default vendorServ