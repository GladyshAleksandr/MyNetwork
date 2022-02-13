import axios from "axios"
import { instance, ResultCodeForCaptcha, ResultCodesEnum, ResponseType } from './api';


type MeResponseType = {
        id: number
        email: string
        login: string
}

type LoginResponseDataType = {
        userId: number,
}




export const authAPI = {

    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data);
    },
    
            login(email: string | null, password: string | null, rememberMe= false, captcha: string | null = null) {
                return instance.post<ResponseType<LoginResponseDataType,ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
                .then(res =>res.data);
            },
    
            logout () {
                return instance.delete(`auth/login`);
            }
    

}