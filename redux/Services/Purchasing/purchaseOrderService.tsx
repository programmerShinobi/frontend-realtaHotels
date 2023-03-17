import axios from '../../../config/http-common'

const getPurchaseOrder = async()=>{
    try{
        const res = await axios.get('/purchase-order-header/purchasing')
        return res
    }catch(e:any){
        return e.message
    }
}

const getPurchaseOrderDetail = async ()=>{
    try{
        const res = await axios.get('/purchase-order-detail')
        return res
    }catch(e:any){
        return e.message
    }
}

const insertPurchaseOrder = async(data:any) =>{
    try{
        const res = await axios.post('/purchase-order-header',data)
        return res
    }catch(e:any){
        return e.message
    }
}

const editPurchaseOrder = async (data:any) =>{
    try{
        const res = await axios.put(`/purchase-order-header/${data.poheId}`, data)
        return res
    }catch(e:any){
        return e.message
    }
}

const purchaseOrderService ={
    insertPurchaseOrder,
    getPurchaseOrder,
    editPurchaseOrder,
    getPurchaseOrderDetail
}

export default purchaseOrderService