import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { updateCredential } from "../../store/user";

function UserCredentialUpdatePage () {

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [errors, setErrors] = useState({});

    if (!sessionUser) history.push('/login')

    const handleUpdateUserPassword = async (e) => {
        e.preventDefault();

        if(password != confirmPassword) {
            errors.password = "Password and ConfirmPassword doesn't match"
        }

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

        const infoData = {
            password
        }

        await dispatch(updateCredential(infoData))

        setErrors({})

        history.push('/user')

    }

    return (
        <div className="user-info-update-container">
            <div className="user-info-update-wrapper">
                <div className="user-info-update-content">
                    <div className="user-info-update-header">
                        <h1>Update User Password</h1>
                        <div className="update-info-container">
                            <form className="user-update-form" onSubmit={handleUpdateUserPassword} >
                                <div className="form-label">Current Password</div>
                                <input className="form-input"
                                    type="password"
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <div className="form-label">New Password</div>
                                <input className="form-input"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="form-label">Confirm Password</div>
                                <input className="form-input"
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button id='address-submit-btn' type='submit'>Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCredentialUpdatePage;
