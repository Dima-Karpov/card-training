import axios from "axios";
import { ProfileResponseType } from "../bll/reducer/auth-reducer/auth-reducer";



// http://localhost:7542/2.0/
// https://neko-back.herokuapp.com/2.0/

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    me(){
       return instance.post<LoginUserResponseType>(`auth/me`, {}) 
    },
    login(email: string, password: string, rememberMe: boolean){
        return instance.post<LoginUserResponseType>(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete<LogoutResponceType>(`auth/me`, {})
    },
    singUp(email: string, password: string){
        return instance.post<LoginUserResponseType>(`auth/register`, {email, password})
    },
    restorePassword(email: string){
        return instance.post(`auth/forgot`, {
            email: email,
            from: `test-front <dimka.karpov111@gmail.com>`,
            message: `<div style="background-color: lime; padding: 15px">
                            Click <a href='http://localhost:3000/card-training#/updatePassword/$token$'>here</a> to restore your password
                      </div>`
        })
    },
};



export type LoginUserResponseType = ProfileResponseType;
export type LogoutResponceType = {
    info: string
}