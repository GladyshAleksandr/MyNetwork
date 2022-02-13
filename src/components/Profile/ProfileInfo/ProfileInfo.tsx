import React, { ChangeEvent } from 'react';
import Preloader from '../../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/userPhoto.png';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';


type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({ profile, isOwner, status, updateStatus, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const mainPhotoOnSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (FormData: ProfileType) => {

        saveProfile(FormData).then(() => {
            setEditMode(false);
        })


    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos?.large || userPhoto} className={s.mainPhoto}></img>
                {isOwner && <input type={"file"} onChange={mainPhotoOnSelected} /> }
                <br/>

                {editMode
                    ? <ProfileDataForm  handleSubmit={onSubmit} />
                    : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )


}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {

    return <div>

        {isOwner &&
            <div>
                <button onClick={goToEditMode}>
                    edit
                </button>
            </div>
        }

        <div>
            <b>Full name </b>: {profile.fullname}
        </div>

        <div>
            <b>Looking  for  a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>

        {profile.lookingForAJob &&
            <div>
                <b>My professional skills </b>: {profile.lookingForAJobDescription}
            </div>

        }

        <div>
            <b>About me </b>: {profile.aboutMe}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts ? profile.contacts : '').map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts ? profile.contacts [key as keyof ContactsType] : '' } />
            })}
        </div>

    </div>
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string | undefined
}

const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;