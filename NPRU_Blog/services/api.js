import axios from "axios";
import Toolbar from "quill/modules/toolbar";
import tokenService from "./token.service";
const baseURL = import.meta.env.VITE_base_URL ;

const instance = axios.create({
    baseURL: baseURL,

    },
);
instance.interceptors.request.use((config => {
    const token = tokenService.getAccessToken();
    if (token) {
        config.headers["x-access-token"] = token;
    }
    return config;
}));

export default instance;