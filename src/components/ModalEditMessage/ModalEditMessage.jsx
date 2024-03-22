import './ModalEditMessage.css'

import { IoClose } from "react-icons/io5"
import { BsFillSendFill } from "react-icons/bs"

function ModalEditMessage ( {msg, closeModal, editedMessage, setEditedMessage, handleSaveEdit} ) {

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Editar Mensaje</h3>
                    <button onClick={closeModal}><IoClose /></button>
                </div>
                <div className="modal-body">
                    <p>{editedMessage}</p>
                </div>
                <form onClick={(e) => e.preventDefault()} className="modal-footer">
                    <input type="text" value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                    <button type='submit' onClick={() => handleSaveEdit(msg.id)}><BsFillSendFill /></button>
                </form>
            </div>
        </div>
    )
}

export default ModalEditMessage