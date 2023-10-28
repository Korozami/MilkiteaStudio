import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../store/address';
import { useHistory, useParams } from "react-router-dom";
import { fetchAddressId } from '../../store/address';
import { CountryData } from '../../data/countries';


function UpdateAddressForm() {
    const dispatch = useDispatch();
    const { addressId } = useParams();
    const currAddress = useSelector((state) => state.addresses[addressId] || "")
    const history = useHistory();
    const [ city, setCity ] = useState(currAddress?.city || "");
    const [ address, setAddress ] = useState(currAddress?.address || "");
    const [ state, setState ] = useState(currAddress?.state || "");
    const [ country, setCountry ] = useState(currAddress?.country || "");
    const [ zip, setZip ] = useState(currAddress?.zip);
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        if(!currAddress) {
            dispatch(fetchAddressId(addressId)).then((currAddress) => {
                if (currAddress) {
                    setCity(currAddress?.city);
                    setAddress(currAddress?.address);
                    setState(currAddress?.state);
                    setCountry(currAddress?.country);
                    setZip(currAddress?.zip);
                }
            })
            .catch((err) => {
                console.error("Error fetching address details", err);
            });
        }

    }, [dispatch, addressId, currAddress])

    useEffect(() => {
        const errors = {};

        if (zip > 99999 || zip < 10000 && zip != 0) {
            errors.zip = "please enter a valid 5 digit zip code"
        }

        if (!(CountryData.includes(country)) && country.length != 0) {
            errors.country = "please enter a valid country"
        }

        if (address.length != 0 && address.length < 5) {
            errors.address = "please enter a valid address"
        }

        setErrors(errors)
    }, [address, country, zip])

    const handleUpdateAddress = async (e) => {

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

        let res = await dispatch(updateAddress(addressId, addressData))

        if (res) {
            history.push("/address")
            setErrors({})
        }
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Update Address</div>
            </div>
            <form className='address-form' onSubmit={handleUpdateAddress} >
                <div className='address-section'>
                    <div className='form-label'>Country/Region</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                    />
                    <div className='error-blocks'>
                        {errors.country && (<p className="error">*{errors.country}</p>)}
                    </div>
                    <div className='form-label'>Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        />
                    <div className='error-blocks'>
                        {errors.address && (<p className="error">*{errors.address}</p>)}
                    </div>
                    <div className='form-label'>City</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                        />
                    <div className='form-label'>State</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                        />
                    <div className='form-label'>Zip Code</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                        required
                        />
                    <div className='error-blocks'>
                        {errors.zip && (<p className="error">*{errors.zip}</p>)}
                    </div>
                    <button id='address-submit-btn' type='submit'>Update Address</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAddressForm;
