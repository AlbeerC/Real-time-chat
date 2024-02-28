import './Register.css'
import { Link, Navigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

function Register () {

    const auth = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        await auth.register(email, password)

        setRedirect(true)
    }

    const handleRegisterWithGoogle = async () => {
        await auth.loginWithGoogle()

        setRedirect(true)
    }

    if (!auth.error && redirect) {
        return <Navigate to='/'/>
    }

    return (
        <section className='register'>
            <h2>Crea tu cuenta</h2>
            <form>
                <div className="field">
                    <label>E-mail</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Contraseña</label>
                    <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='submit' onClick={(e) => handleRegister(e)}>Crear cuenta</button>
            </form>
            <button className='google' onClick={handleRegisterWithGoogle}>
                <FcGoogle />
                <span>Registrarse con google</span>
            </button>
            <p className='error-message'>{auth.error}</p>
            <p>Ya tenés una cuenta? <Link to='/login'>Inicia sesión</Link></p>
        </section>
    )
}

export default Register