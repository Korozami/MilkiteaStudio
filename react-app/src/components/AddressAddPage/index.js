import './AddressAdd.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../store/address';
import { useHistory } from "react-router-dom";
import { CountryData } from '../../data/countries';

function AddressForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ city, setCity ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ zip, setZip ] = useState();
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (address.length != 0 && address.length < 5) {
            errors.address = "please enter a valid address"
        }

        if (zip > 99999 || zip < 10000 && zip != 0) {
            errors.zip = "please enter a valid 5 digit zip code"
        }

        if (!(CountryData.includes(country)) && country.length != 0) {
            errors.country = "please enter a valid country"
        }

        setErrors(errors)
    }, [address, country, zip])

    const handleAddAddress = async (e) => {

        e.preventDefault();

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

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
            setErrors({})
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
                    <div className='error-blocks'>
                        {errors.country && (<p className="error">*{errors.country}</p>)}
                    </div>
                    <div className='form-label'>Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Street address or P.O Box'
                        required
                        />
                    <div className='error-blocks'>
                        {errors.address && (<p className="error">*{errors.address}</p>)}
                    </div>
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
                    <div className='error-blocks'>
                        {errors.zip && (<p className="error">*{errors.zip}</p>)}
                    </div>
                    <button id='address-submit-btn' type='submit'>Add Address</button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm;
