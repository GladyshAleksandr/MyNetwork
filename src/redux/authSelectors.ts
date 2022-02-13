import { AppStateType } from "./reduxStore";



export const getAuthSelector = (state: AppStateType) => {
    return state.auth.isAuth

}

export const getCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login

}


