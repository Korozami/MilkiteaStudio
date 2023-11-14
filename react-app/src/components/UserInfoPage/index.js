import './UserInfo.css'
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers, updateUserInfo, updateCredential } from '../../store/user';


function UserInfoPage () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className='user-info-body'>
            <div className='user-info-wrapper'>
                <div> testing</div>
            </div>
        </div>
    )
}

export default UserInfoPage;
