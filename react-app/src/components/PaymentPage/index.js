import React, { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import OpenModalButton from '../Modal';
import { NavLink } from 'react-router-dom';
import { fetchPayments } from '../../store/payment';

function PaymentPage() {
    const dispatch = useDispatch();
    const paymentData = useSelector(state => state.payments.payments)
    const allPayment = paymentData ? Object.values(paymentData.payments) : []
    console.log(allPayment)

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


    useEffect(() => {
        dispatch(fetchPayments())
    }, [dispatch, paymentData])

    return (
        <div className='address-main-body'>
            <div className='address-header'>Your Wallet</div>
            <div className='address-body-wrapper'>
                <NavLink className="address-add" exact to="/payment/add">
                    <div className='adding-container'>
                        <i className='material-icons' id='add-btn'>add</i>
                        <div className='adding-lable'>Add Payment</div>
                    </div>
                </NavLink>
                <div className='address-contents'>
                    {allPayment.map((payment, index) => {
                        if(payment) {
                            return (
                                <div key={index} className='address-info-container'>
                                    <div className='address-info'>{payment?.name}</div>
                                    <div className='address-info'>{findCardName(payment?.card_number.toString().slice(0,1))}</div>
                                    <div className='address-info'>Credit card ending in {payment?.card_number.toString().slice(-4)}</div>
                                    <div className='button-container'>
                                        <NavLink className="address-update" exact to={`/payment/${payment?.id}/update`}>
                                            <button type='button'>Update</button>
                                        </NavLink>
                                        {/* <OpenModalButton buttonName="Delete" modalComponent={<DeleteAddress addressId={address?.id} />} /> */}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}


export default PaymentPage;
