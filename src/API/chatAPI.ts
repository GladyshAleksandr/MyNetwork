

const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
} 


type EventsNamesTypes = 'messages-received' | 'status-changed'
let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')

}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('refresh page')
}

let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)

}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s =>s(status))

}

function createChannel() {
    cleanUp()

    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)


}


export const chatAPI = {
    start () {
        createChannel()
    },

    stop () {
        subscribers['status-changed'] = []
        subscribers['messages-received'] = []
        cleanUp()
        ws?.close()
    },

    subscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
             // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
                  // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    
    sendMessage(message: string) {
        ws?.send(message);

    }
}



type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'
