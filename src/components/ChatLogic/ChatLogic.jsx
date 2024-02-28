import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/config'
import { useEffect, useState} from 'react'
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, query, orderBy } from 'firebase/firestore'
import ChatBox from '../ChatBox/ChatBox'

function ChatLogic () {

    const auth = useAuth()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'messages'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => doc.data())
                setMessages(newMessages.reverse())
            }
        );

        return () => unsubscribe()

    }, [])


    const handleSendMessage = async (e) => {
        e.preventDefault();

        const getUserName = () => {
            const user = auth.getUserFromLocalStorage()
            return user?.displayName || auth.cutDomainFromEmail(user?.email)
        }
    
        if (message.trim() !== '') {
            const messageData = {
                message: message,
                user: getUserName(),
                timestamp: serverTimestamp()
            }

            const docRef = await addDoc(collection(db, 'messages'), messageData)

            setTimeout(async () => {
                await deleteDoc(docRef)
            }, 6000)

            setMessage('');
        }
    }

    return (
        <ChatBox messages={messages} message={message} handleSendMessage={handleSendMessage} setMessage={setMessage} />
    )
}

export default ChatLogic