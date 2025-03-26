

export default function ChatDetail({ topicId, chatId, newChat }) {
    return (
        newChat ?
            <div>New chat</div>
            : <div>
                Chat
                <div>{topicId}</div>
                <div>{chatId}</div>
            </div>
    )
}