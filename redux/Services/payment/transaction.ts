import axios from 'axios'
import { TRANSACTION_URL } from '@/lib/urls'

const getAll = async (payload: any): Promise<any> => {
    const paginationParams = `page=${payload?.data.page}&limit=${payload?.data.limit}`
    let searchParams: string = "&"
    
    for (let [key, value] of Object.entries<string>(payload.data.keyword)) {
        if (value) {
            searchParams += `${key}=${value.toString().trim()}&`
        }
    }
    
    return await axios.get(`${TRANSACTION_URL}/filter?${paginationParams}${searchParams}`)
}

const create = async (payload: any): Promise<any> => {
    return await axios.post(`${TRANSACTION_URL}/new`, payload)
}

const transactionService = {
    getAll,
    create
}

export default transactionService