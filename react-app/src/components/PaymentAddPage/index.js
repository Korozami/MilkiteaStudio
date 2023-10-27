import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createPayment } from '../../store/payment';


function PaymentForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ card_number, setCardNumber ] = useState("");
    const [ name, setName ] = useState("");
    const [ expiration_date, setExpirationDate ] = useState();
    const [ security_code, setSecurityCode ] = useState();
    const [ billing_address, setBillingAddress ] = useState("");
    const [ errors, setErrors] = useState({});

    let today = new Date().toISOString().slice(0, 7)

    useEffect(() => {
        const errors = {};

        if (today > expiration_date) {
            errors.expiration_date = "card is expired"
        }

        if (card_number.length != 0 && (card_number.length < 13 || card_number.length > 16)) {
            errors.card_number = "invalid card number again"
        }

        // if (card_number.length != 0 && ((card_number[0] != "3" && card_number[1] != "7") || card_number[0] != "4" || card_number[0] != "5" || card_number[0] != "6")) {
        //     errors.card_number = "invalid card number"
        // }

        if (security_code > 9999 || security_code < 100) {
            errors.security_code = "invalid CVV/CVC"
        }

        if (name.length < 2 && name.length != 0) {
            errors.name = "name should be longer than 1 letter?"
        }

        if (billing_address.length < 10 && billing_address.length != 0) {
            errors.billing_address = "invalid billing address"
        }

        setErrors(errors)
    }, [expiration_date, card_number, security_code, name, billing_address])

    const handleAddPayment = async (e) => {

        e.preventDefault();

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

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
            setErrors({})
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
                    <div className='error-blocks'>
                        {errors.card_number && (<p className="error">*{errors.card_number}</p>)}
                    </div>
                    <div className='form-label'>Name on card</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name on card'
                        required
                        />
                    <div className='error-blocks'>
                        {errors.name && (<p className="error">*{errors.name}</p>)}
                    </div>
                    <div className='form-label'>Expiration Date</div>
                    <input className='form-input'
                        type='month'
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                        />
                    <div className='error-blocks'>
                        {errors.expiration_date && (<p className="error">*{errors.expiration_date}</p>)}
                    </div>
                    <div className='form-label'>Security Code (CVV/CVC)</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setSecurityCode(e.target.value)}
                        required
                        />
                    <div className='error-blocks'>
                        {errors.security_code && (<p className="error">*{errors.security_code}</p>)}
                    </div>
                    <div className='form-label'>Billing Address</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder='Billing Address'
                        required
                        />
                    <div className='error-blocks'>
                        {errors.billing_address && (<p className="error">*{errors.billing_address}</p>)}
                    </div>
                    <button id='address-submit-btn' type='submit'>Add Address</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentForm;
