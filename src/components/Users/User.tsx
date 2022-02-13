import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollowThunkCreator: (userId: number) => void
    followThunkCreator: (userId: number) => void
}

let User: React.FC<PropsType> = ({ user, followingInProgress, unfollowThunkCreator, followThunkCreator }) => {

    return <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.usersPhoto} />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollowThunkCreator(user.id);
                    }}>Unfollow</button>


                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        followThunkCreator(user.id);
                    }}>Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{/* u.location.country */}</div>
                <div>{/* u.location.city */}</div>
            </span>
        </span>
    </div>
}

export default User;