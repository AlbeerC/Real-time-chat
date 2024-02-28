import { auth } from '../firebase/config'
import { createContext, useContext, useState, useEffect } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = createContext()

function AuthProvider ( {children} ) {
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
          setIsLogged(true)
        }
      }, [])

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
        } catch (error) {
            setError(`Error al registrar usuario: ${error.message}`)
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar usuario: ${error.message}`)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar con google: ${error.message}`)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setIsLogged(false)
            setError(null)
            removeUserFromLocalStorage()
        } catch (error) {
            setError(`Error al cerrar sesión: ${error.message}`)
        }
    }

    const getUser = () => {
        const currentUser = auth.currentUser
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    }

    const storeUserInLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
    }

    const cutDomainFromEmail = (email) => {
        const atIndex = email.indexOf('@')

        if (atIndex !== -1) {
            const username = email.substring(0, atIndex)
            return username
        }

        return email
    }

    return (
        <AuthContext.Provider value={{isLogged, error, register, login, loginWithGoogle, logout, getUser, getUserFromLocalStorage, cutDomainFromEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;