import { useState } from "react"
import { IoClose } from "react-icons/io5"
import './UserProfile.css'
import { useAuth } from "../../context/AuthContext"

function UserProfile({ closeModal, user }) {

    const auth = useAuth()

    return (
        <section className="user-profile">
            <div className="content">
                <div className="content-header">
                    <h2>{user}</h2>
                    <button onClick={closeModal}><IoClose /></button>
                </div>
                <div className="content-body">
                    <img src={auth.getUser().photoURL} alt="Vista previa de la imagen" />
                </div>
            </div>
        </section>
    );
}

export default UserProfile;
