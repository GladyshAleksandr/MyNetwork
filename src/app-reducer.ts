import { InferActionsTypes } from './redux/reduxStore';
import { getAuthDataThunkCreator } from "./auth-reducer";


let initialState =
{
    initialized: false,
}

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }

        case "INITIALIZED_FAILED":
            return {
                ...state,
                initialized: false,
            }

        default:
            return state;

    }
}


export const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const),
    initializedFailed: () => ({ type: "INITIALIZED_FAILED" } as const)


}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthDataThunkCreator());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        //    dispatch(actions.initializedFailed())
        })

}

export default appReducer;