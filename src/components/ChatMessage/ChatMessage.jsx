import { useAuth } from '../../context/AuthContext'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import ModalEditMessage from '../ModalEditMessage/ModalEditMessage'
import { FaAngleDown } from "react-icons/fa"
import { useState } from 'react'
import userDefaultImage from '../../assets/user.jpg'

function ChatMessage ( {msg, handleDeleteMessage, handleEditMessage, editingMessageId, editedMessage, setEditedMessage, handleSaveEdit} ) {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <div className={`message-box ${user === msg.user ? 'user-message' : ''}`}>
            <div className="top">
                <img src={getUser && getUser.photoURL ? getUser.photoURL : userDefaultImage} alt="user profile image" />
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
                        <ModalEditMessage 
                            msg={msg}
                            closeModal={closeModal}
                            editedMessage={editedMessage}
                            setEditedMessage={setEditedMessage}
                            handleSaveEdit={handleSaveEdit}
                        />
                    )}
                </div> 
            : null }
            </div>
            <p className='message'>{msg.message}</p>
        </div>
    )
}

export default ChatMessage