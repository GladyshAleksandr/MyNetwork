import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { ProfileType } from '../../../types/types';



type ProfileDataFormType = {
    handleSubmit: (ProfileData: ProfileType) => void
}

const ProfileDataForm: React.FC<ProfileDataFormType> = ({ handleSubmit }) => {

    let profile = useSelector((state: AppStateType) => state.profilePage.profile)

    let onSubmit = (values: ProfileType) => {

        let profileData: ProfileType =
        {
            lookingForAJob: values.lookingForAJob,
            fullname: values.fullname,
            contacts: {
                github: values.contacts.github,
                vk: values.contacts.vk,
                facebook: values.contacts.facebook,
                instagram: values.contacts.instagram,
                twitter: values.contacts.twitter,
                website: values.contacts.website,
                youtube: values.contacts.youtube,
                mainLink: values.contacts.mainLink
            },
            aboutMe: values.aboutMe,
            lookingForAJobDescription: values.lookingForAJobDescription,
            photos: values.photos,
            userId: values.userId,
        }

        handleSubmit(profileData)
    }
    return <div>
        <Formik
            initialValues={{
                lookingForAJob: profile?.lookingForAJob, fullname: profile?.fullname,
                aboutMe: profile?.aboutMe,
                lookingForAJobDescription: profile?.lookingForAJobDescription,
                photos: profile?.photos, iserId: profile?.userId,
                contacts: {
                    github: profile?.contacts?.github,
                    vk: profile?.contacts?.vk,
                    facebook: profile?.contacts?.facebook,
                    instagram: profile?.contacts?.instagram,
                    twitter: profile?.contacts?.twitter,
                    website: profile?.contacts?.website,
                    youtube: profile?.contacts?.youtube,
                    mainLink: profile?.contacts?.mainLink
                }
            }}

            onSubmit={onSubmit}

        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <b>Full name </b> <Field type="text" name="fullname" />
                    </div> <br />
                    <div>
                        <b>Looking for a job</b> <Field type="checkbox" name="lookingForAJob" />
                    </div> <br />
                    <div>
                        <b>Looking for a job description</b> <Field type="text" name="lookingForAJobDescription" />
                    </div> <br />
                    <div>
                        <b>About me </b> <Field type="text" name="aboutMe" />
                    </div> <br />
                    <div>
                        <b>Contacts</b> <br />
                        <div>github</div>
                        <Field type="text" name="github" />
                        <div>vk</div>
                        <Field type="text" name="vk" />
                        <div>facebook</div>
                        <Field type="text" name="facebook" />
                        <div>instagram</div>
                        <Field type="text" name="instagram" />
                        <div>twitter</div>
                        <Field type="text" name="twitter" />
                        <div>website</div>
                        <Field type="text" name="website" />
                        <div>youtube</div>
                        <Field type="text" name="youtube" />
                        <div>mainLink</div>
                        <Field type="text" name="mainLink" />

                    </div> <br />

                    <button type="submit" disabled={isSubmitting} >
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default ProfileDataForm