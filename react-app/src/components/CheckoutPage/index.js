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
    const sessionUser = useSelector(state => state.session.user);
    const addressData = useSelector((state) => state.addresses.addresses)
    const paymentData = useSelector((state) => state.payments.payments)

    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []
    const allAddress = addressData ? Object.values(addressData.addresses) : []
    const allPayment = paymentData ? Object.values(paymentData.payments) : []

    const [ changeAddress, setChangeAddress ] = useState(false)
    const [ city, setCity ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ state, setState ] = useState("");
    const [ zip, setZip ] = useState("");
    const [ selectedAddress, setSelectedAddress ] = useState(false)

    const [changePayment, setChangePayment] = useState(false)
    const [selectedPaymentCard, setSelectedPaymentCard] = useState("")
    const [paymentSelected, setPaymentSelected] = useState(false)
    const [selectedPaymentAddress, setSelectedPaymentAddress] = useState("")
    const card_name = ["American Express", "Visa", "Mastercard", "Discover"];

    if (city === "" && selectedAddress === false) {
        allAddress.map((address) => {
            if(address?.primary) {
                setCity(address?.city)
                setAddress(address?.address)
                setState(address?.state)
                setZip(address?.zip)
            } else if (address?.id === 1) {
                setCity(address?.city)
                setAddress(address?.address)
                setState(address?.state)
                setZip(address?.zip)
            }
        })
    }

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

    function changePaymentButtonDropDown () {
        setChangePayment(!changePayment)
    }

    function changeAddressButtonDropDown () {
        setChangeAddress(!changeAddress)
    }

    //set primary payment on render
    if(selectedPaymentCard === "" && paymentSelected === false){
        allPayment.map((payment) => {
            if(payment?.primary) {
                setSelectedPaymentCard(payment?.card_number)
                setSelectedPaymentAddress(payment?.billing_address)
            } else if (payment?.id === 1) {
                setSelectedPaymentCard(payment?.card_number)
                setSelectedPaymentAddress(payment?.billing_address)
            }
        });
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
                                <div className='address-info-checkout-content'>
                                    <div className='address-info-left'>
                                        <h3>Shipping address</h3>
                                    </div>
                                    <div className='address-info-middle'>
                                        <div className='address-info'>{sessionUser?.first_name} {sessionUser?.middle_name || ""} {sessionUser?.last_name}</div>
                                        <div className='address-info'>{address}</div>
                                        <div className='address-info'>{city}, {state} {zip}</div>
                                    </div>
                                    <div className='address-info-right'>
                                        <button onClick={changeAddressButtonDropDown}>Change</button>
                                    </div>
                                </div>
                            </div>
                            <div className='payment-checkout-content-dropdown'>
                                <div className={`payment-info-dropdown-container ${changeAddress ? 'active' : 'inactive'}`}>
                                    Select Address
                                </div>
                                {allAddress.map((address, index) => {
                                    function changeAddressMethod() {
                                        setCity(address?.city)
                                        setAddress(address?.address)
                                        setState(address?.state)
                                        setZip(address?.zip)
                                        setSelectedAddress(true)
                                        setChangeAddress(false)
                                    }
                                    if(address && changeAddress) {
                                        return (
                                            <div key={index} onClick={changeAddressMethod} className='address-info-container'>
                                                <div className='address-info'>{sessionUser?.first_name} {sessionUser?.last_name}</div>
                                                <div className='address-info'>{address?.address}</div>
                                                <div className='address-info'>{address?.city}, {address?.state} {address?.zip}</div>
                                                <div className='address-info'>{address?.country}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='payment-checkout-container'>
                        <div className='payment-checkout-wrapper'>
                            <div className='payment-checkout-content'>
                                <div className='payment-info-checkout-content'>
                                    <div className='payment-info-left'>
                                        <h3>Payment method</h3>
                                    </div>
                                    <div className='payment-info-middle'>
                                        <div className='payment-info'>{findCardIcon(selectedPaymentCard.toString().slice(0,1))} Paying
                                            with {findCardName(selectedPaymentCard.toString().slice(0,1))} {selectedPaymentCard.toString().slice(-4)}
                                        </div>
                                        <div className='payment-info'>Billing address: {selectedPaymentAddress}</div>
                                    </div>
                                    <div className='payment-info-right'>
                                        <button onClick={changePaymentButtonDropDown}>Change</button>
                                    </div>
                                </div>
                            </div>
                            <div className='payment-checkout-content-dropdown'>
                                <div className={`payment-info-dropdown-container ${changePayment ? 'active' : 'inactive'}`}>
                                    Select Payment
                                </div>
                                {allPayment.map((payment, index) => {

                                    //change payment method
                                    function changePaymentMethod() {
                                        setSelectedPaymentCard(payment?.card_number)
                                        setSelectedPaymentAddress(payment?.billing_address)
                                        setPaymentSelected(true)
                                        setChangePayment(false)
                                    }

                                    if(payment && changePayment) {
                                        return (
                                            <div key={index}  onClick={changePaymentMethod} className='payment-info-dropdown-content'>
                                                <div className='payment-dropdown-info'>{findCardIcon(payment?.card_number.toString().slice(0,1))}</div>
                                                <div className='payment-dropdown-info'>{payment?.name}</div>
                                                <div className='payment-dropdown-info'>{findCardName(payment?.card_number.toString().slice(0,1))}</div>
                                                <div className='payment-dropdown-info'>Credit card ending in {payment?.card_number.toString().slice(-4)}</div>
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
