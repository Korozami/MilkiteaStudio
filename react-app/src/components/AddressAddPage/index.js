import './AddressAdd.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../store/address';


function AddressForm() {
    const dispatch = useDispatch();
    const [ city, setCity ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ zip, setZip ] = useState();
    const [ errors, setErrors] = useState({});

    const handleAddAddress = async (e) => {
        e.preventDefault();

        const addressData = {
            city,
            address,
            state,
            country,
            zip
        }

        const res = await dispatch(createAddress(addressData));

        if (res) {

        }


    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Add a new address</div>
            </div>
            <form className='address-form' onSubmit={} >
                <div className='address-section'>
                    <div className='country-label'>Country/Region</div>
                    <input className='country-input'
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                        required
                    />
                    <div className='address-lable'>Address</div>
                    <input className='address-input'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Street address or P.O Box'
                        required
                        />
                    <div className='city-label'>City</div>
                    <input className='city-input'
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                        required
                        />
                    <div className='state-label'>State</div>
                    <input className='state-input'
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                        required
                        />
                    <div className='zip-label'>Zip Code</div>
                    <input className='zip-input'
                        type='number'
                        onChange={(e) => setZip(e.target.value)}
                        placeholder='Zip Code'
                        required
                        />
                    <button id='address-submit-btn' type='submit'>Add Address</button>
                </div>
            </form>
        </div>
    )
}
