import React from 'react';
import { ProfileType } from '../types/types';
import profileReducer, { actions } from './profileReducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ],
    newPostText: 'Itiko0itilo',
    profile: null,
    status: "",
}

it('new  post should be added  and post sould be incremented', () => {
    // 1. preparing start data
    let action = actions.addPostActionCreator();

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
});


it('new  post should be added  and message should be correct', () => {
    // 1. preparing start data
    let action = actions.addPostActionCreator();

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[5].message).toBe("Some tested text");
});


it('length after deleted should be decremented', () => {
    // 1. preparing start data
    let action = actions.deletePost(1);


    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);// Надо будет создать свoйство ,,length,,
}); 