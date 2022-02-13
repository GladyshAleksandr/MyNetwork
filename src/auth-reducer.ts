import { ResultCodesEnum, ResultCodeForCaptcha } from "./API/api";
import { authAPI } from "./API/authAPI";
import { securityAPI } from "./API/securityAPI";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux/reduxStore";


export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    captchaUrl: string | null
    password: string | null
    rememberMe: boolean
    isAuth: boolean
    myId: number | null
}

let initialState: initialStateType =
{
    userId: null,
    email: null,
    login: null,
    captchaUrl: null,
    rememberMe: false,
    password: null,
    isAuth: false,
    myId: null

}


const authReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "AUTH/SET_USER_DATA":
        case "AUTH/GET_CAPTCHA_URL_SUCCESS":
        case "AUTH/SET_MY_ID":
            return {
                ...state,
                ...action.payload,
            }

        case "AUTH/STOP_SUBMIT":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}


export const actions = {
    stopSubmit: (redirectTo: string | null, error: string | null) => ({ type: "AUTH/STOP_SUBMIT", payload: { redirectTo, error } } as const),
    setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: "AUTH/SET_USER_DATA", payload: { userId, email, login, isAuth } } as const), // instead data - payload
    getCapctchaUrlSuccess: (captchaUrl: string) =>
        ({ type: "AUTH/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } } as const),
    setMyId: (myId: number | null) => ({ type: "AUTH/SET_MY_ID", payload: { myId } } as const), 
}


export const getAuthDataThunkCreator = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setUserData(id, email, login, true));
        dispatch(actions.setMyId(id))
    }

}



export const login = (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthDataThunkCreator())
    }

    else {

        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCapctchaUrl)
        }

        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : "Some error"

        dispatch(actions.stopSubmit("/login", message));
    }
}



export const getCapctchaUrl = async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCapctchaUrlSuccess(captchaUrl));
}



export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false));
    }
}

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>


export default authReducer;