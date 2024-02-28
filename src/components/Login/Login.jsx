import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Login () {

    const auth = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        await auth.login(email, password)

        setRedirect(true)
    }

    const handleLoginWithGoogle = async () => {
        await auth.loginWithGoogle()
        
        setRedirect(true)
    }

    if (!auth.error && redirect) {
        return <Navigate to='/'/>
    }

    return (
        <section className='login'>
        <h2>Iniciá sesión</h2>
        <form>
            <div className="field">
                <label>E-mail</label>
                <input type="email" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="field">
                <label>Contraseña</label>
                <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='submit' onClick={handleLogin}>Ingresar</button>
        </form>
        <button className='google' onClick={handleLoginWithGoogle}>
            <FcGoogle />
            <span>Ingresar con google</span>
        </button>
        <p className='error-message'>{auth.error}</p>
        <p>No tenes una cuenta? <Link to='/register'>Registrate</Link></p>
    </section>
    )
}

export default Login