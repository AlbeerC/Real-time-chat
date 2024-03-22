import './Navbar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { FaUserAlt } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useState } from 'react';
import UserProfile from '../UserProfile/UserProfile';
import userDefaultImage from '../../assets/user.jpg'

function Navbar () {

    const auth = useAuth()
    const theme = useTheme()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <header>
            <Link to='/'><h1>AlberChatApp</h1></Link>
            {
            isLogged ?
                <div className="logged">
                    <button className='open-modal' onClick={openModal}>
                        <img src={getUser && getUser.photoURL ? getUser.photoURL : userDefaultImage} alt="user profile image" />
                        {user}
                    </button>
                    <button className='logout' onClick={() => auth.logout()}>Cerrar sesión</button>
                </div> :
                <div className="buttons">
                <Link to='/login'>Iniciar sesión</Link>
                <Link to='/register'>Registrarse</Link>
                </div>
            }
            <button className='theme' onClick={theme.toggleMode}>
                {theme.darkMode ? <FaMoon /> : <FaSun />}
            </button>
{/*             {
            isModalOpen ?
                <UserProfile closeModal={closeModal} user={user}/>
                : null
            } */}
        </header>
    )
}

export default Navbar