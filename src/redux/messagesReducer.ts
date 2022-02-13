import { InferActionsTypes } from './reduxStore';


type DialogType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState =
{
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,

    newMessageText: 'Sasha Gladysh Message',

    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ] as Array<MessagesType>,
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const messagesReducer = (state = initialState, action: ActionsType): initialStateType => {

    if (action.type === "SEND_MESSAGE") {
        let newMessage =
        {
            id: 6,
            message: state.newMessageText,
        };

        return {
            ...state,
            messages: [...state.messages, { id: 6, message: state.newMessageText }],
            newMessageText: '',
        };

    }

    else if (action.type === "UPDATE_MESSAGE_TEXT") {
        return {
            ...state,
            newMessageText: action.newText
        };
    }

    return state;
}

export const actions = {
    sendMessageActionCreator: () => ({ type: "SEND_MESSAGE" } as const),
    updateMessageActionCreator: (text: string) => ({ type: "UPDATE_MESSAGE_TEXT", newText: text } as const)
}


export default messagesReducer;