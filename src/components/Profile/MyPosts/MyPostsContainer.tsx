import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import MyPosts from './MyPosts'; 


let mapStateToProps = (state: AppStateType) =>
{
   return {
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
   }
}

let mapDispatchToProps = (dispatch: any) =>
{
   return {
      addPost: () =>
      {
            dispatch(actions.addPostActionCreator());
      },

      updateNewPostText: (text: any ) =>
      {
         let action  = actions.updateNePostTextActionCreator(text);
            dispatch(action);
      }
   }
}


let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default  MyPostsContainer;