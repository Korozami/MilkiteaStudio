import './UserInfo.css'
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
// import { useEffect } from 'react';


function UserInfoPage () {
    // const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) history.push('/login')


    // useEffect(() => {

    // }, [dispatch, sessionUser])

    return (
        <div className='user-info-body'>
            <div className='user-info-wrapper'>
                <div className='user-content'>
                    <div className='user-selection'>
                        <h3>Your Information</h3>
                        <div className='user-update-info'>
                            <div className='user-info-box'>
                                <div className='user-info-label'>Name</div>
                                <div className='user-info-value'>{sessionUser?.first_name} {sessionUser?.last_name}</div>
                                <div className='user-info-label'>Username</div>
                                <div className='user-info-value'>{sessionUser?.username}</div>
                                <div className='user-info-label'>Email</div>
                                <div className='user-info-value'>{sessionUser?.email}</div>
                            </div>
                            <NavLink exact to={'/update/information'}>
                                <button type='button'>Update Info</button>
                            </NavLink>
                        </div>
                        <h3>Login Security</h3>
                        <div className='user-update-info'>
                            <div className='user-info-box'>
                                <div className='user-info-label'>Password</div>
                                <div className='user-info-value'>**********</div>
                            </div>
                            <NavLink exact to={'/update/credentials'}>
                                <button type='button'>Update Password</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage;
