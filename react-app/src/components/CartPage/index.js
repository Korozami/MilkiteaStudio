import './cartpage.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchCart, fetchCartItem, updateCartItem, deleteCartItem } from '../../store/cart';


function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.carts.carts)
    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []
    let number = 0;

    const getDefaultCart = () => {
        let cart = {}
        for (let i = 0; i < cartItems?.cart_item.length; i++) {
            cart[i] = cartItems?.cart_item[i]?.item_amount;
        }
        return cart;
    }

    const [cartQuantity, setCartQuantity] = useState(getDefaultCart())

    const setCartItems = (itemId, item_amount) => {

        let productId = cartItems?.cart_item[itemId]?.product?.id;
        setCartQuantity((prev) => ({... prev, [itemId]: item_amount}))

        if (item_amount > 0) {
            const cartData = {
                item_amount
            }

            dispatch(updateCartItem(productId, cartData))
        }

    }

    function temporaryalert () {
        alert("Shop temporarily closed please check back again to buy your goodies :(")
    }


    const deletion = function (productId) {
        let deleted = dispatch(deleteCartItem(productId))
        if (deleted) {
            console.log("DELETED")
        }
    }

    useEffect(() => {
        if(!cartItems) {
            dispatch(fetchCart()).then((cartItems) => {
                if (cartItems) {
                    setCartQuantity(getDefaultCart());
                }
            })
            .catch((err) => {
                console.error("Error fetching cart item", err);
            });
        }

    }, [dispatch, cartItems])

    return (
        <div className='cart-container'>
            <div className='cart-wrapper'>
                <div className='cart-content'>
                    {allCartItems.map((item, index) => {
                        {number += (Number(item?.item_amount) * Number(item?.product?.price))}

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
                                        onChange={(e) => setCartItems(item?.id - 1, e.target.value)}
                                        value={cartQuantity[item?.id - 1]}
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
                    <button onClick={temporaryalert}>CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
