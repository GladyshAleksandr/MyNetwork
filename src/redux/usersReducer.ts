import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResponseType } from "../API/api";
import { usersAPI } from "../API/usersAPI";
import { PhotosType, UserType } from "../types/types";
import { updateObjectInArray } from "../utilits/objectHelper";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";


let initialState =
{
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID,
                    "id", { followed: true })

            }

        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID,
                    "id", { followed: false })
            }

        case "SET_USERS": {
            return { ...state, users: action.users }
        }

        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }

        case "SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }

        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }

        case "TOGGLE_IN_PROGRESS": {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        }

        case "USERS/SET_FILTER": {
            return { ...state, filter: action.payload}
        }

        default:
            return state;

    }
}


export const actions = {
    follow: (userID: number) => ({ type: "FOLLOW", userID } as const),
    unfollow: (userID: number) => ({ type: "UNFOLLOW", userID } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setcurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    setFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userID: number) => ({ type: "TOGGLE_IN_PROGRESS", isFetching, userID } as const),
    setFilter:  (filter: FilterType) => ({ type: "USERS/SET_FILTER", payload: filter } as const),
}


export const getUsers = (currentPage: number, pageSize: number, filter: FilterType)
    : ThunkType => {
    return async (dispatch, getState) => {

        dispatch(actions.setFetching(true));
        dispatch(actions.setcurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, 
    apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionsType) => {
        
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId)

    if (data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));

}

export const followThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        
        let apiMethod = usersAPI.follow.bind(usersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.follow);
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollow);
    }
}


export type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;


export default usersReducer;