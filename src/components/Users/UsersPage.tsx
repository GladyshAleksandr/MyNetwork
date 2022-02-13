import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {  getIsFetchingSelector } from "../../redux/usersSelectors";



type OwnPropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<OwnPropsType> = (props) => {

    const isFetching = useSelector(getIsFetchingSelector)

    return <>
        <h2>{props.pageTitle}</h2>  `                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               `
        {isFetching ?
            <Preloader /> : null
        }

        <Users />
    </>
}

//export default UsersPage

