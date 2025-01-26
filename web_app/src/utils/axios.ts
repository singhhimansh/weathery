import axios from "axios";


// Create an axios instance for node.js backend service
const backendInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default backendInstance;