import { AppStateType } from "./reduxStore";
//import { createSelector } from "reselect";



export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

/* export const  getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})
 */ // Етот супер селектор пока не использую потомучто сейчас  в селекторах у меня пройтой функционал

export const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage

}


export const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching


}

export const getFollowingInProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress

}

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount

}

export const getUsersFilterSelector = (state: AppStateType) => {
    return state.usersPage.filter

}


