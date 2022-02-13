import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;             