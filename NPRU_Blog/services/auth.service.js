import api from "./api.js"
const Auth_URL = import.meta.env.VITE_Auth_URL;
import tokenService from "./token.service.js";

const register = async (username, password) => {
    return await api.post(Auth_URL + "/register", {
        username,
        password,
    });
}
const login = async (username, password) => {
    const response = await api.post(Auth_URL + "/login", {
        username,
        password,
    });
    const {status, data} = response;
    if (status === 200){
        if(data?.accessToken){
            tokenService.setUser(data);
        }
    }
    return response;
}
const logout = () => {
    tokenService.removeUser();
}

const authService = {
    register,
    login,
    logout,
}
export default authService;