import axios from "axios";

const API = axios.create({
    baseURL: " https://pharmacy-inventory-system-a1mw.onrender.com/api"
});


// Attach token automatically
API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    if(token){

        req.headers.Authorization =
            `Bearer ${token}`;
    }

    return req;
});

export default API;