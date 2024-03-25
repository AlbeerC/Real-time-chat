import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/config'
import { useEffect, useState} from 'react'
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import ChatBox from '../ChatBox/ChatBox'

function ChatLogic () {

    const auth = useAuth()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [editedMessage, setEditedMessage] = useState("")
    const [editingMessageId, setEditingMessageId] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'messages'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                setMessages(newMessages.reverse())
            }
        )

        return () => unsubscribe()

    }, [])


    const handleSendMessage = async (e) => {
        e.preventDefault()

        const getUserName = () => {
            const user = auth.getUserFromLocalStorage()
            return user?.displayName || auth.cutDomainFromEmail(user?.email)
        }

        const getProfileImage = () => {
            const user = auth.getUserFromLocalStorage()
            if (user && user.photoURL) {
                return user.photoURL
            } 
            return null
        }
    
        if (message.trim() !== '') {
            const messageData = {
                message: message,
                user: getUserName(),
                timestamp: serverTimestamp(),
                image: getProfileImage(),
            }

            const docRef = await addDoc(collection(db, 'messages'), messageData)

            setTimeout(async () => {
                await deleteDoc(docRef)
            }, 60000)

            setMessage('')
        }
    }

    const handleDeleteMessage = async (messageId) => {
        try {
            await deleteDoc(doc(db, 'messages', messageId))
            setMessages(messages.filter(msg => msg.id !== messageId))
        } catch (error) {
            console.error("Error deleting message", error)
        }
    }

    const handleEditMessage = (messageId, messageContent) => {
        setEditingMessageId(messageId)
        setEditedMessage(messageContent)
    }

    const handleSaveEdit = async () => {
        try {
            const messageRef = doc(db, 'messages', editingMessageId)
            await updateDoc(messageRef, { message: editedMessage })
    
            setEditingMessageId(null)
            setEditedMessage("")
        } catch (error) {
            console.error("Error saving edition", error)
        }
    }
    

    return (
        <ChatBox
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage} 
            handleEditMessage={handleEditMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleSaveEdit={handleSaveEdit}
            editedMessage={editedMessage}
            setEditedMessage={setEditedMessage}
            editingMessageId={editingMessageId}
        />
    )
}

export default ChatLogic