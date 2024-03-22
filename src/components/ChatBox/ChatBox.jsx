import './ChatBox.css'
import { useAuth } from '../../context/AuthContext'
import { BsFillSendFill } from "react-icons/bs"
import ChatMessage from '../ChatMessage/ChatMessage'

function ChatBox ( {messages, message, setMessage, handleSendMessage, handleEditMessage, handleDeleteMessage, handleSaveEdit, editedMessage, setEditedMessage, editingMessageId} ) {

    const auth = useAuth()

    return (
        <section className="chat-box">
            <div className='messages'>
                {messages.map((msg, i) => (
                    <ChatMessage key={i}
                        msg={msg}
                        handleDeleteMessage={handleDeleteMessage}
                        handleEditMessage={handleEditMessage}
                        editingMessageId={editingMessageId}
                        editedMessage={editedMessage}
                        setEditedMessage={setEditedMessage}
                        handleSaveEdit={handleSaveEdit}
                    />
                ))}
            </div>

            {auth.isLogged ?
                <div className="form-container">
                    <form onSubmit={handleSendMessage}>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Escribe tu mensaje' />
                        <button type='submit'><BsFillSendFill /></button>
                    </form>
                </div>
                :
                <p className='not-logged'>Tienes que inciar sesión para poder escribir</p>
            }
        </section>
    )
}

export default ChatBox