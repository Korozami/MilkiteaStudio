import './UserPage.css'
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';


function UserPage () {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) history.push('/login')

    return (
        <div className='user-page'>
            <div className='user-page-content'>
                <div className='user-header'>Your Account</div>
                <div className='user-page-wrapper'>
                    <NavLink className="user-info-link" exact to="/user">
                        <div className='user-info-container'>
                            <i class="fa-regular fa-user fa-xl"></i>
                            <div className='user-info-title'>Profile</div>
                            <div className='user-info-description'>Edit login and name</div>
                        </div>
                    </NavLink>
                    <NavLink className="user-info-link" exact to="/address">
                        <div className='user-info-container'>
                            <i className="fa-regular fa-address-book fa-xl"></i>
                            <div className='user-info-title'>Addresses</div>
                            <div className='user-info-description'>Add, edit, remove or set default address</div>
                        </div>
                    </NavLink>
                    <NavLink className="user-info-link" exact to="/payment">
                        <div className='user-info-container'>
                            <i class="fa-regular fa-credit-card fa-xl"></i>
                            <div className='user-info-title'>Payments</div>
                            <div className='user-info-description'>Add, edit, remove or set default Payments</div>
                        </div>
                    </NavLink>
                    <NavLink className="user-info-link" exact to="/order">
                        <div className='user-info-container'>
                            <i class="fa-solid fa-box fa-lg"></i>
                            <div className='user-info-title'>Orders</div>
                            <div className='user-info-description'>Track your orders</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default UserPage;
