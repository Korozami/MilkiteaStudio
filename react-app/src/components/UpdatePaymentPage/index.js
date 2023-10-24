import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { updatePayment, fetchPaymentId } from '../../store/payment';


function UpdatePaymentForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { paymentId } = useParams();
    const currPayment = useSelector((state) => state.payments[paymentId]);
    console.log(currPayment?.billing_address)
    const [ card_number, setCardNumber ] = useState(currPayment?.card_number);
    const [ name, setName ] = useState(currPayment?.name);
    const [ expiration_date, setExpirationDate ] = useState(currPayment?.expiration_date);
    const [ security_code, setSecurityCode ] = useState(currPayment?.security_code);
    const [ billing_address, setBillingAddress ] = useState(currPayment?.billing_address);
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchPaymentId(paymentId))
    }, [dispatch])

    const handleAddPayment = async (e) => {

        e.preventDefault();

        const paymentData = {
            card_number,
            name,
            expiration_date,
            security_code,
            billing_address
        }

        let res = await dispatch(updatePayment(paymentId, paymentData));

        if (res) {
            history.push("/payment")
        }
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Update Payment</div>
            </div>
            <form className='address-form' onSubmit={handleAddPayment} >
                <div className='address-section'>
                    <div className='form-label'>Card number</div>
                    <input className='form-input'
                        type='text'
                        value={card_number}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                    <div className='form-label'>Name on card</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        />
                    <div className='form-label'>Expiration Date</div>
                    <input className='form-input'
                        type='month'
                        onChange={(e) => setExpirationDate(e.target.value)}
                        value={expiration_date}
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
                        value={billing_address}
                        required
                        />
                    <button id='address-submit-btn' type='submit'>Update Payment</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePaymentForm;
