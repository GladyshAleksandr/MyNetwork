import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Paginator from "../../common/preloader/Paginator/Paginator";
import { FilterType, getUsers, unfollowThunkCreator, followThunkCreator } from "../../redux/usersReducer";
import { getCurrentPageSelector, getUsersFilterSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersSelector, getFollowingInProgressSelector } from "../../redux/usersSelectors";
import User from "./User";
import { UsersSearchForm } from "./UsersSearchForm"
import * as queryString from 'querystring'


type QueryParamsType  =  {term?: string; page?: string; friend?: string}

export const Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const filter = useSelector(getUsersFilterSelector)
    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgressSelector)

    
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null"
    ? null :parsed.friend === "true" ? true :false}


        dispatch(getUsers(actualPage, pageSize, actualFilter));

    },[])


    useEffect(() => {

        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({ 
            pathname: '/developers',
            search: queryString.stringify(query)
        })

    }, [filter, currentPage])



    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));

    }
    const unfollowThunk   = (userId: number) => {
        dispatch(unfollowThunkCreator(userId))
    }
    const followThunk  = (userId: number) => {
        dispatch(followThunkCreator(userId))

    }


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize} />
        {
            users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                unfollowThunkCreator={unfollowThunk}
                followThunkCreator={followThunk} />)
        }

    </div>
}
