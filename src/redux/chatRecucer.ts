import {v1} from  'uuid'
import { chatAPI, StatusType, ChatMessageType, } from './../API/chatAPI';
import { InferActionsTypes, BaseThunkType } from './reduxStore';


let initialState =
{
    messages: [] as ChatIdType[],
    status: 'pending' as StatusType
}

type ChatIdType = ChatMessageType & {id: string}


const chatReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "CHAT/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            }

        case "CHAT/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }


        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ type: "CHAT/MESSAGES_RECEIVED", payload: { messages } } as const),
    statusChanged: (status: StatusType) => ({ type: "CHAT/STATUS_CHANGED", payload: { status } } as const),

}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: any) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler

}


let _StatusChangedHandler: ((status: StatusType) => void) | null = null 

const StatusChangedHandlerCreator = (dispatch: any) => {
    if (_StatusChangedHandler === null) {
        _StatusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _StatusChangedHandler

}



export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', StatusChangedHandlerCreator(dispatch))

}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', StatusChangedHandlerCreator(dispatch))}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}



export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>;


export default chatReducer;