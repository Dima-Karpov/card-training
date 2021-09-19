import axios from "axios";

// http://localhost:7542/2.0/
// https://neko-back.herokuapp.com/2.0/

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
};