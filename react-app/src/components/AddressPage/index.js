import './AddressPage.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAddresses } from '../../store/address';


function AddressPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch])

    return (
        <div className='address-main-body'>
            <div className='address-body-wrapper'>
                <div className='address-contents'>

                </div>
            </div>
        </div>
    )
}


export default AddressPage;
