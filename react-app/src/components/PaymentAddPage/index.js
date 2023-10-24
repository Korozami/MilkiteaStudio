import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createPayment } from '../../store/payment';


function PaymentForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ card_number, setCardNumber ] = useState();
    const [ name, setName ] = useState("");
    const [ expiration_date, setExpirationDate ] = useState();
    const [ security_code, setSecurityCode ] = useState();
    const [ billing_address, setBillingAddress ] = useState("");
    const [ errors, setErrors] = useState({});

    const handleAddPayment = async (e) => {

        e.preventDefault();

        const paymentData = {
            card_number,
            name,
            expiration_date,
            security_code,
            billing_address
        }

        let res = await dispatch(createPayment(paymentData));

        if (res) {
            history.push("/payment")
        }
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Add a new payment</div>
            </div>
            <form className='address-form' onSubmit={handleAddPayment} >
                <div className='address-section'>
                    <div className='form-label'>Card number</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder='Card number'
                        required
                    />
                    <div className='form-label'>Name on card</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name on card'
                        required
                        />
                    <div className='form-label'>Expiration Date</div>
                    <input className='form-input'
                        type='month'
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                        />
                    <div className='form-label'>Security Code (CVV/CVC)</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setSecurityCode(e.target.value)}
                        required
                        />
                    <div className='form-label'>Billing Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder='Billing Address'
                        required
                        />
                    <button id='address-submit-btn' type='submit'>Add Address</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentForm;
