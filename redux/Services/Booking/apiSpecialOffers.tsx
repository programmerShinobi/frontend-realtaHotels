import axios from "../../../config/http-common";

const getAll = async() =>{
    try{
        const result = await axios.get("/specialoffers/guest");
        return result
    }catch(error:any){
        return  error.messege
    }
}

const ApiSpecialOffers = {
    getAll
}
export default ApiSpecialOffers