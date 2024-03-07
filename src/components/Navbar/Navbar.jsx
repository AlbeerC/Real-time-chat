import './Navbar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { FaUserAlt } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

function Navbar () {

    const auth = useAuth()
    const theme = useTheme()

    const user = auth.getUserFromLocalStorage()
    const isLogged = auth.isLogged

    return (
        <header>
            <Link to='/'><h1>AlberChatApp</h1></Link>
            {
            isLogged ?
                <div className="logged">
                    <p><FaUserAlt />{user?.displayName || auth.cutDomainFromEmail(user?.email)}</p>
                    <button onClick={() => auth.logout()}>Cerrar sesión</button>
                </div> :
                <div className="buttons">
                <Link to='/login'>Iniciar sesión</Link>
                <Link to='/register'>Registrarse</Link>
                </div>
            }
            <button className='theme' onClick={theme.toggleMode}>
                {theme.darkMode ? <FaMoon /> : <FaSun />}
            </button>
        </header>
    )
}

export default Navbar