import React from "react";
import './popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <i onClick={() => props.setTrigger(false)} className="fa-regular fa-circle-xmark fa-xl"></i>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup
