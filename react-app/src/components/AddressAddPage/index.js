import './AddressAdd.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../store/address';
import { useHistory } from "react-router-dom";


function AddressForm() {
    const dispatch = useDispatch();
    const history = useHistory();
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

        let res = await dispatch(createAddress(addressData));

        if (res) {
            history.push("/address")
        }
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Add a new address</div>
            </div>
            <form className='address-form' onSubmit={handleAddAddress} >
                <div className='address-section'>
                    <div className='form-label'>Country/Region</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                        required
                    />
                    <div className='form-label'>Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Street address or P.O Box'
                        required
                        />
                    <div className='form-label'>City</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                        required
                        />
                    <div className='form-label'>State</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                        required
                        />
                    <div className='form-label'>Zip Code</div>
                    <input className='form-input'
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

export default AddressForm;
