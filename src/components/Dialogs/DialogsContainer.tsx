import React from 'react';
import { actions } from '../../redux/messagesReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux"
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';


let mapStateToProps = (state: AppStateType)  =>
{
    return  {
      /*       messages: state.messagesPage.messages,
            dialogs: state.messagesPage.dialogs,
            newMessageText: state.messagesPage.newMessageText, */
            dialogsPage: state.messagesPage
    } 
}

let mapDispatchToProps = (dispatch: any)  =>
{
    return  {
        sendMessage: () =>
        {
            let action = actions.sendMessageActionCreator();
            dispatch(action);
        },
        updateMessage: (text: string) =>
        {
            let action =  actions.updateMessageActionCreator(text);
            dispatch(action);
        }
    }
}  

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
) (Dialogs);