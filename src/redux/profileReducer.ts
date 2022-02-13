import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { profileAPI } from './../API/profileAPI';
import { usersAPI } from '../API/usersAPI';
import { PostType, ProfileType, PhotosType } from './../types/types';


let initialState =
{
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostType>,
    newPostText: 'Itiko0itilo',
    profile: null as ProfileType | null,
    status: "",
}


const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    if (action.type === 'MP/PROFILE/ADD-POST') {

        let newPost =
        {
            id: 5,
            message: state.newPostText,
            likesCount: 0
        };

        return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: '',
        };

    }

    else if (action.type === 'MP/PROFILE/UPDATE-NEW-POST-TEXT') {
        return {
            ...state,
            newPostText: action.newText,
        };
    }

    else if (action.type === 'MP/PROFILE/SET_USER_PROFILE') {
        return {
            ...state,
            profile: action.profile,
        };
    }

    else if (action.type === 'MP/PROFILE/SET_STATUS') {
        return {
            ...state,
            status: action.status,
        };
    }

    else if (action.type === 'MP/PROFILE/DELETE_POST') {
        return {
            ...state,
            posts: state.posts.filter(p => p.id != action.postId),
        };
    }

    else if (action.type === 'MP/PROFILE/SAVE_PHOTO_SUCCESS') {
        return {
            ...state,
            profile: { ...state.profile, photos: action.photos } as ProfileType,
        };
    }

    return state;

    //  return stateCopy;
}


export const actions = {

    addPostActionCreator: () => ({
        type: 'MP/PROFILE/ADD-POST'
    } as const),

    updateNePostTextActionCreator: (text: string) => ({
        type: 'MP/PROFILE/UPDATE-NEW-POST-TEXT', newText: text
    } as const),

    setUserProfile: (profile: ProfileType) => ({
        type: 'MP/PROFILE/SET_USER_PROFILE', profile
    } as const),
    

    setStatus: (status: string) => ({
        type: 'MP/PROFILE/SET_STATUS', status
    } as const),

    deletePost: (postId: number) => ({
        type: 'MP/PROFILE/DELETE_POST', postId
    } as const),

    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'MP/PROFILE/SAVE_PHOTO_SUCCESS', photos
    } as const),

}





export const getUserProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)

    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)
    debugger

    if (data.resultCode === 0) {

        if (userId != null) dispatch(getUserProfileThunkCreator(userId));

        else throw new Error("user id can't be null");
    }

    /*   else {
          dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
          return Promise.reject(response.data.messages[0]);
      } */
}



export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>



export default profileReducer;