import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { initialStateType } from '../../redux/messagesReducer';


type OwnPropsType = {
    dialogsPage: initialStateType
    sendMessage: () => void
    updateMessage: (text: string | undefined) => void
    newMessageText: string
}



const Dialogs: React.FC<OwnPropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    //   let formMessageRef = React.createRef()
    let formMessageRef = React.useRef<HTMLTextAreaElement>(null);

    let onSendMessage = () => {

        props.sendMessage();
    }

    let onMessageChange = () => {
        let text = formMessageRef.current?.value;
        props.updateMessage(text);

    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>

            <div className="sendMsg">
                <textarea ref={formMessageRef} onChange={onMessageChange} value={props.newMessageText}></textarea>
                <button className="buttonSendMessage" onClick={onSendMessage}>Send message</button>

            </div>
        </div>
    )
}
// Bag  message not  erased after sending
export default Dialogs;