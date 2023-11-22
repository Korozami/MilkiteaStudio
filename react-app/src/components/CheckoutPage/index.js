import './Checkout.css';
import { fetchAddresses, fetchAddressId } from '../../store/address';
import { fetchPayments, fetchPaymentId } from '../../store/payment';
import { fetchCart, fetchCartItem } from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function CheckoutPage() {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.carts.carts)
    const addressData = useSelector((state) => state.addresses.addresses)
    const paymentData = useSelector((state) => state.payments.payments)
    const [changePayment, setChangePayment] = useState(false)
    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []
    const allAddress = addressData ? Object.values(addressData.addresses) : []
    const allPayment = paymentData ? Object.values(paymentData.payments) : []

    const card_name = ["American Express", "Visa", "Mastercard", "Discover"];

    function findCardName (number) {
        if (number === "3" || number === 3) {
            return card_name[0];
        } else if (number === "4" || number === 4) {
            return card_name[1];
        } else if (number === "5" || number === 5) {
            return card_name[2];
        } else if (number === "6" || number === 6) {
            return card_name[3];
        } else {
            return "Unknown"
        }
    }

    function findCardIcon (number) {
        if (number === "3" || number === 3) {
            return <i className="fa-brands fa-cc-amex"></i>;
        } else if (number === "4" || number === 4) {
            return <i className="fa-brands fa-cc-visa"></i>;
        } else if (number === "5" || number === 5) {
            return <i className="fa-brands fa-cc-mastercard"></i>;
        } else if (number === "6" || number === 6) {
            return <i class="fa-brands fa-cc-discover"></i>;
        } else {
            return "Unknown"
        }
    }

    function changePaymentButton () {
        setChangePayment(!changePayment)
    }

    useEffect(() => {
        dispatch(fetchCart())
        dispatch(fetchAddresses())
        dispatch(fetchPayments())
    }, [dispatch])

    return (
        <div className='checkout-container'>
            <div className='checkout-wrapper'>
                <div className='checkout-left-content'>
                    <div className='address-checkout-container'>
                        <div className='address-checkout-wrapper'>
                            <div className='address-checkout-content'>
                            </div>
                        </div>
                    </div>
                    <div className='payment-checkout-container'>
                        <div className='payment-checkout-wrapper'>
                            <div className='payment-checkout-content'>
                            {allPayment.map((payment, index) => {
                                    if(payment?.primary) {
                                        return (
                                            <div key={index} className='address-info-checkout-content'>
                                                <div className='address-info-left'>
                                                    <h3>Payment method</h3>
                                                </div>
                                                <div className='address-info-middle'>
                                                    <div className='address-info'>{findCardIcon(payment?.card_number.toString().slice(0,1))} Paying
                                                        with {findCardName(payment?.card_number.toString().slice(0,1))} {payment?.card_number.toString().slice(-4)}
                                                    </div>
                                                    <div className='address-info'>Billing address: {payment?.billing_address}</div>
                                                </div>
                                                <div className='address-info-right'>
                                                    <button onClick={changePaymentButton}>Change</button>
                                                </div>
                                            </div>
                                        )
                                    } else if (payment?.id === 1) {
                                        return (
                                            <div key={index} className='address-info-checkout-content'>
                                                <div className='address-info-left'>
                                                    <h3>Payment method</h3>
                                                </div>
                                                <div className='address-info-middle'>
                                                    <div className='address-info'>{findCardIcon(payment?.card_number.toString().slice(0,1))} Paying
                                                        with {findCardName(payment?.card_number.toString().slice(0,1))} {payment?.card_number.toString().slice(-4)}
                                                    </div>
                                                    <div className='address-info'>Billing address: {payment?.billing_address}</div>
                                                </div>
                                                <div className='address-info-right'>
                                                    <button onClick={changePaymentButton}>Change</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className='payment-checkout-content-dropdown'>
                                {allPayment.map((payment, index) => {
                                    if(payment && changePayment) {
                                        return (
                                            <div>
                                                <div key={index} className='address-info-dropdown-container'>
                                                    <div className='address-dropdown-info'>{findCardIcon(payment?.card_number.toString().slice(0,1))}</div>
                                                    <div className='address-dropdown-info'>{payment?.name}</div>
                                                    <div className='address-dropdown-info'>{findCardName(payment?.card_number.toString().slice(0,1))}</div>
                                                    <div className='address-dropdown-info'>Credit card ending in {payment?.card_number.toString().slice(-4)}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='product-checkout-container'>
                        <div className='product-checkout-wrapper'>
                            <div className='product-checkout-content'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='checkout-right-content'></div>
            </div>
        </div>
    )
}

export default CheckoutPage;
