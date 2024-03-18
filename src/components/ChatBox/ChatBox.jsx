import './ChatBox.css'
import { useAuth } from '../../context/AuthContext'
import { BsFillSendFill } from "react-icons/bs"
import { FaAngleDown } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'

function ChatBox ( {messages, message, setMessage, handleSendMessage, handleEditMessage, handleDeleteMessage, handleSaveEdit, editedMessage, setEditedMessage, editingMessageId} ) {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <section className="chat-box">
            <div className='messages'>
                {messages.map((msg, i) => (
                    <div key={i} className={`message-box ${user === msg.user ? 'user-message' : ''}`}>
                        <div className="top">
                            <img src="https://placehold.co/30x30" alt="" />
                            <p className='username'>{msg.user}</p>
                            { user === msg.user || user === "Alber Caminos" ?
                            <div className='functions'>
                                <Menu>
                                    <MenuButton><FaAngleDown /></MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => handleDeleteMessage(msg.id)}>Borrar</MenuItem>
                                        <MenuItem onClick={() => { handleEditMessage(msg.id, msg.message); openModal() }}>Editar</MenuItem>
                                    </MenuList>
                                </Menu>
                                {editingMessageId === msg.id && isModalOpen && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3>Editar Mensaje</h3>
                                                <button onClick={closeModal}><IoClose /></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>{editedMessage}</p>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="text" value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                                                <button type='submit' onClick={() => handleSaveEdit(msg.id)}><BsFillSendFill /></button>
                                            </div>
                                        </div>
                                  </div>
                                )}
                            </div> 
                         : null }
                        </div>
                        <p className='message'>{msg.message}</p>
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