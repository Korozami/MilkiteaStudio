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
    const addressItems = useSelector((state) => state.addresses.addresses)
    const paymentItems = useSelector((state) => state.payments.payments)
    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []

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
                            <div className='address-checkout-content'></div>
                        </div>
                    </div>
                    <div className='payment-checkout-container'>
                        <div className='payment-checkout-wrapper'>
                            <div className='payment-checkout-content'></div>
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
