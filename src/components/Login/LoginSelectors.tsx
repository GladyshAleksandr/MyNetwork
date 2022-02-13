import { AppStateType } from "../../redux/reduxStore"


export const getEmailSelector = (state: AppStateType) => {
    return state.auth.email
}

export const getPasswordSelector = (state: AppStateType) => {
    return state.auth.password
}

export const getRememberMeSelector = (state: AppStateType) => {
    return state.auth.rememberMe
}

export const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const getUserIdSelector = (state: AppStateType) => {
    return state.auth.userId
}



