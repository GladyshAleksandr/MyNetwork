import axios from "axios"
import { instance } from './api';

type GetCaptchaUrllREsponseType= {
    url: string
}

export const securityAPI = {

    getCaptchaUrl() {
        return instance.get<GetCaptchaUrllREsponseType>(`security/get-captcha-url`).then(res => res.data)
    }


}