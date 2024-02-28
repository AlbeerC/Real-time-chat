import './ChatBox.css'
import { useRef } from 'react'
import { useAuth } from '../../context/AuthContext'

function ChatBox ( {messages, message, setMessage, handleSendMessage} ) {

    const auth = useAuth()

    return (
        <section className="chat-box">
            <div className="messages">
                {messages.map((msg, i) => (
                    <p key={i}>
                        <span>{msg.user}:</span> 
                        {msg.message}
                    </p>
                ))}
            </div>

            {auth.isLogged ?
                <div className="form-container">
                    <form onSubmit={handleSendMessage}>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Escribe tu mensaje' />
                        <button type='submit'>Enviar</button>
                    </form>
                </div>
                :
                <p className='not-logged'>Tienes que inciar sesión para poder escribir</p>
            }
        </section>
    )
}

export default ChatBox