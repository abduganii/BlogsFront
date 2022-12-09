import axios from "axios";


const instance = axios.create({
    baseURL: "https://blogsapp.onrender.com"
});

instance.interceptors.request.use((config) => {
    config.headers.token = window.localStorage.getItem('token');
    return config
})

export default instance;