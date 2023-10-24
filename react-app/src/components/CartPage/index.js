import './cartpage.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchCart, fetchCartItem, updateCartItem, deleteCartItem } from '../../store/cart';


function CartPage() {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState()
    const cartItems = useSelector((state) => state.carts.carts)
    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []
    let number = 0;

    const deletion = function (productId) {
        let deleted = dispatch(deleteCartItem(productId))
        if (deleted) {
            console.log("DELETED")
        }
    }


    const handleChange = async (id, e) => {

        let item_amount = Number(e)

        console.log(item_amount)
        console.log(id)

        // const cartData = {
        //     item_amount
        // }

    }

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    return (
        <div className='cart-container'>
            <div className='cart-wrapper'>
                <div className='cart-content'>
                    {allCartItems.map((item, index) => {
                        {number += (Number(item?.item_amount) * Number(item?.product?.price))}
                        console.log(quantity)
                        return (
                            <div key={index} className='cart-item'>
                                <img src={item?.product?.product_images[0].imageUrl} alt='product-image' height={100} />
                                <div className='cart-item-section-one'>
                                    <div className='product-name'>{item?.product?.item_name}</div>
                                    <div className='product-price'>${item?.product?.price}.00</div>
                                </div>
                                <form className='cart-form'>
                                    <input className='cart-quanitiy-input'
                                        type='number'
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={item?.item_amount}
                                    />
                                </form>
                                <div className='total-amount'>${Number(item?.item_amount) * Number(item?.product?.price)}.00 </div>
                                <i onClick={() => deletion(item?.id)} className="fa-regular fa-circle-xmark fa-xl"></i>
                            </div>
                        )
                    })}
                </div>
                <div className='cart-checkout'>
                    <div className='checkout-total'>
                        Subtotal ${number}.00
                    </div>
                    <button>CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
