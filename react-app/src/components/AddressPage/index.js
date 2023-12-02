import './AddressPage.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import OpenModalButton from '../Modal';
import { NavLink } from 'react-router-dom';
import DeleteAddress from '../DeleteAddress';
import { fetchAddresses } from '../../store/address';
import primary from '../image/primary.jpg'


function AddressPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const addressData = useSelector(state => state.addresses.addresses)
    const allAddress = addressData ? Object.values(addressData.addresses) : []

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch, addressData])

    return (
        <div className='address-main-body'>
            <div className='address-header'>Your Addresses</div>
            <div className='address-body-wrapper'>
                <NavLink className="address-add" exact to="/address/add">
                    <div className='adding-container'>
                        <i className='material-icons' id='add-btn'>add</i>
                        <div className='adding-lable'>Add Address</div>
                    </div>
                </NavLink>
                <div className='address-contents'>
                    {allAddress.map((address, index) => {
                        if(address) {
                            return (
                                <div key={index} className='address-info-container'>
                                    <img src={primary} alt='primary' className={`primary-image ${address?.primary ? 'active' : 'inactive'}`} />
                                    <div className='address-info'>{sessionUser?.first_name} {sessionUser?.last_name}</div>
                                    <div className='address-info'>{address?.address}</div>
                                    <div className='address-info'>{address?.city}, {address?.state} {address?.zip}</div>
                                    <div className='address-info'>{address?.country}</div>
                                    <div className='button-container'>
                                        <NavLink className="address-update" exact to={`/address/${address?.id}/update`}>
                                            <button type='button'>Update</button>
                                        </NavLink>
                                        <OpenModalButton className="delete-btn" buttonName="Delete" modalComponent={<DeleteAddress addressId={address?.id} />} />
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}


export default AddressPage;
