import { ProfileType, UserType } from './../types/types';
import axios from "axios"


export type ResponseType<T = {}, RC = ResultCodesEnum> = {
    data: T
    messages: Array<string>
    resultCode: RC

}

export const instance = axios.create({

    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "77050942-3922-49f4-b4ed-1beb34179329"
    }
});


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount:  number
    error: string | null
}

