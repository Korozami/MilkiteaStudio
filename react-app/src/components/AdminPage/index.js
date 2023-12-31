import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import './adminpage.css';
import Popup from '../BoughtItemPopup/popup';

function AdminPage() {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [alertAdminPopupOrder, setAdminAlertPopupOrder] = useState(false)


    if (!sessionUser) history.push('/login')

    return (
        <div className='admin-page'>
            <Popup trigger={alertAdminPopupOrder} setTrigger={setAdminAlertPopupOrder}>
                <h3>Still working on it Boss! Trust</h3>
            </Popup>
            <div className='admin-page-content'>
                <div className='admin-header'>Dashboard</div>
                <div className='admin-page-wrapper'>
                    <div className='admin-navlinks-container'>
                        <NavLink className="user-info-link" exact to="/user">
                            <div className='user-info-container'>
                                <i className="fa-regular fa-user fa-xl"></i>
                                <div className='user-info-title'>Profile</div>
                                <div className='user-info-description'>Edit login and name</div>
                            </div>
                        </NavLink>
                        <NavLink className="user-info-link" exact to="/admin/products">
                            <div className='user-info-container'>
                                <i className="fa-solid fa-shop fa-xl"></i>
                                <div className='user-info-title'>Products</div>
                                <div className='user-info-description'>View, Edit, Add and Delete Products</div>
                            </div>
                        </NavLink>
                        <NavLink className="user-info-link" exact to="/admin">
                            <div onClick={() => setAdminAlertPopupOrder(true)} className='user-info-container'>
                                <i className="fa-solid fa-box fa-xl"></i>
                                <div className='user-info-title'>Orders</div>
                                <div className='user-info-description'>View, Edit, Add and Delete Orders</div>
                            </div>
                        </NavLink>
                    </div>
                    <div className='admin-header'>Store Productivity</div>
                    <div className='admin-store-info-container'>
                        <div className='admin-store-info-wrapper'>
                            <div className='user-info-link'>
                                <div className='user-info-container'>
                                    <i className="fa-solid fa-users fa-xl"></i>
                                    <div className='user-info-title'>Total Users</div>
                                    <div className='user-info-details'>TBD</div>
                                </div>
                            </div>
                        </div>
                        <div className='admin-store-info-wrapper'>
                            <div className='user-info-link'>
                                <div className='user-info-container'>
                                    <i className="fa-solid fa-warehouse fa-xl"></i>
                                    <div className='user-info-title'>Total Orders</div>
                                    <div className='user-info-details'>TBD</div>
                                </div>
                            </div>
                        </div>
                        <div className='admin-store-info-wrapper'>
                            <div className='user-info-link'>
                                <div className='user-info-container'>
                                    <i className="fa-solid fa-piggy-bank fa-xl"></i>
                                    <div className='user-info-title'>Total Profit</div>
                                    <div className='user-info-details'>TBD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='admin-recent-orders-container'>
                        <div className='admin-recent-orders-wrapper'>
                            <div className='admin-recent-orders-header'>Recent Orders</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AdminPage;
