import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../store/address';
import { useHistory, useParams } from "react-router-dom";
import { fetchAddressId } from '../../store/address';


function UpdateAddressForm() {
    const dispatch = useDispatch();
    const { addressId } = useParams();
    const currAddress = useSelector((state) => state.addresses[addressId])
    console.log(currAddress?.city)
    const history = useHistory();
    const [ city, setCity ] = useState(currAddress?.city);
    const [ address, setAddress ] = useState(currAddress?.address);
    const [ state, setState ] = useState(currAddress?.state);
    const [ country, setCountry ] = useState(currAddress?.country);
    const [ zip, setZip ] = useState(currAddress?.zip);
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchAddressId(addressId))
    }, [dispatch, addressId])

    const handleUpdateAddress = async (e) => {

        e.preventDefault();

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
                    <div className='form-label'>Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        />
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
                    <button id='address-submit-btn' type='submit'>Update Address</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAddressForm;
