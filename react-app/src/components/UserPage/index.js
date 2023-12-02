import './UserPage.css'
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import Popup from '../BoughtItemPopup/popup';


function UserPage () {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [alertPopupOrder, setAlertPopupOrder] = useState(false)


    if (!sessionUser) history.push('/login')

    return (
        <div className='user-page'>
            <Popup trigger={alertPopupOrder} setTrigger={setAlertPopupOrder}>
                <h3>Order Placement Currently Under Maintenance. Sorry for the Inconvience</h3>
            </Popup>
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
                    <NavLink className="user-info-link" exact to="/user/portfolio">
                        <div onClick={(e) => setAlertPopupOrder(true)} className='user-info-container'>
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
