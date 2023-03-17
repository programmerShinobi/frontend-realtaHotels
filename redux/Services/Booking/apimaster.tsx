import axios from "../../../config/http-common";


const getAll = async() =>{
    try{
        const result = await axios.get("/price-items");
        return result
    }catch(error:any){
        return  error.messege
    }
}

const ApiPriceItems = {
    getAll
}
export default ApiPriceItems