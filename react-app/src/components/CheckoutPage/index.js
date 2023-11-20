import './Checkout.css';
import { fetchAddresses, fetchAddressId } from '../../store/address';
import { fetchPayments, fetchPaymentId } from '../../store/payment';
import { fetchCart, fetchCartItem } from '../../store/cart';


function CheckoutPage() {
    return (
        <div className='checkout-container'>
            <div className='checkout-wrapper'>
                <div className='checkout-content'>
                    <div>testing</div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;
