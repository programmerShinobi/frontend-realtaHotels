import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3005",
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
    },
})