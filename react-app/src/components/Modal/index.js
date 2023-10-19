import { createContext, useState } from "react";
import './Modal.css';
export const context = createContext(null)

const OpenModalButton = ({ buttonName, modalComponent }) => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <context.Provider value={ { setModal }}>
            <div className="btn-modal">
                <button className="modalbtn" onClick={toggleModal}>
                    {buttonName}
                </button>
                {modal && (
                    <div className="modal">
                        <div className="overlay" onClick={toggleModal}></div>
                        <div className="modal-content">
                        {modalComponent}
                        <button className="close-modal" onClick={toggleModal}>
                            Close
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </context.Provider>
    )
};

export default OpenModalButton;
