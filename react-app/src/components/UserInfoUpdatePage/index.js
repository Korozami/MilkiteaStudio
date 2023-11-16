import React from "react";
import './UserInfoUpdate.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { useState } from "react";
import { updateUserInfo } from "../../store/user";

function UserInfoUpdatePage () {

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [first_name, setFirstName] = useState(sessionUser?.first_name || "");
    const [middle_name, setMiddleName] = useState(sessionUser?.middle_name || "");
    const [last_name, setLastName] = useState(sessionUser?.last_name || "");
    const [username, setUsername] = useState(sessionUser?.username || "");
    const [email, setEmail] = useState(sessionUser?.email || "")
    const [errors, setErrors] = useState({});

    if (!sessionUser) history.push('/login')

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

        const infoData = {
            first_name,
            middle_name,
            last_name,
            username,
            email
        }

        await dispatch(updateUserInfo(infoData))

        setErrors({})

        history.push('/user')

    }

    return (
        <div className="user-info-update-container">
            <div className="user-info-update-wrapper">
                <div className="user-info-update-content">
                    <div className="user-info-update-header">
                        <h1>Update User Information</h1>
                        <div className="update-info-container">
                            <form className="user-update-form" onSubmit={handleUpdateUserInfo} >
                                <div className="form-label">Username</div>
                                <input className="form-input"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                                <div className="form-label">First Name</div>
                                <input className="form-input"
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={first_name}
                                    required
                                />
                                <div className="form-label">Middle Name</div>
                                <input className="form-input"
                                    type="text"
                                    onChange={(e) => setMiddleName(e.target.value)}
                                    value={middle_name}
                                />
                                <div className="form-label">Last Name</div>
                                <input className="form-input"
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={last_name}
                                    required
                                />
                                <div className="form-label">Email</div>
                                <input className="form-input"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                                <button id='address-submit-btn' type='submit'>Update Info</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoUpdatePage;
