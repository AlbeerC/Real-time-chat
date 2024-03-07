import './ChatBox.css'
import { useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { BsFillSendFill } from "react-icons/bs";

function ChatBox ( {messages, message, setMessage, handleSendMessage} ) {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null

    return (
        <section className="chat-box">
            <div className='messages'>
                {messages.map((msg, i) => (
                    <div key={i} className={`message-box ${user === msg.user ? 'user-message' : ''}`}>
                        <p><span>{msg.user}:</span>{msg.message}</p>
                    </div>
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