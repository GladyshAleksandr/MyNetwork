import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening, sendMessage } from "../../redux/chatRecucer"
import { AppStateType } from "../../redux/reduxStore"


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }

    }, [])


    return <div>
        {status === 'error' && <div>Some error occured please refresh page</div>}
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element  = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300)
        {
            !isAutoScroll && setAutoScroll(true)
        }
        else {
            isAutoScroll && setAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return <div style={{ height: "400px", overflowY: "auto" }} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}


const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e => setMessage(e.currentTarget.value))} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo( ({ message })  => {

    return <div>
        <img src={message.photo} style={{ width: "30px" }} /> <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})



export default ChatPage