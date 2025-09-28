import axios from "axios";

const getBaseURL = () =>{
    if(import.meta.env.PROD){
        return import.meta.env.VITE_API_URL 
    }
    return import.meta.env.VITE_API_URL;
}
const instance = axios.create({
    baseURL: getBaseURL(), 
    withCredentials: true,
})
export default instance;