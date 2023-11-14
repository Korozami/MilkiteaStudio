import './UserInfo.css'
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUsers, updateUserInfo, updateCredential } from '../../store/user';


function UserInfoPage () {
    const history = useHistory();

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser)

    if (!sessionUser) history.push('/login')

    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [dispatch])

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
                            </div>
                            <button>Update</button>
                        </div>
                        <h3>Update Login & Security</h3>
                        <div className='user-update-info'>
                            <div className='user-info-box'>
                                <div className='user-info-label'>Email</div>
                                <div className='user-info-value'>{sessionUser?.email}</div>
                                <div className='user-info-label'>Password</div>
                                <div className='user-info-value'>**********</div>
                            </div>
                            <button>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage;
