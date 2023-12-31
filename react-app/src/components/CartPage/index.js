import './cartpage.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCart, updateCartItem, deleteCartItem } from '../../store/cart';



function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.carts.carts)
    const allCartItems = cartItems ? Object.values(cartItems.cart_item) : []
    const [ errors, setErrors] = useState({});
    const [ disabled, setDisabled ] = useState(false)
    let number = 0;


    const getDefaultCart = () => {
        let cart = {}
        for (let i = 0; i < cartItems?.cart_item.length; i++) {
            cart[i] = cartItems?.cart_item[i]?.item_amount;
        }
        return cart;
    }


    const [cartQuantity, setCartQuantity] = useState(getDefaultCart())

    useEffect(() => {
        if (!cartItems) {
            dispatch(fetchCart()).then((cartItems) => {
                if(cartItems) {
                    setCartQuantity(getDefaultCart())
                }
            })
            .catch((err) => {
                console.error("Error fetching product details", err);
            });
        }
        if (cartItems?.cart_item.length === 0) {
            setDisabled(true)
        }
    }, [dispatch, cartItems])

    const setCartItems = (itemId, item_amount) => {

        let productId = cartItems?.cart_item[itemId]?.id

        setCartQuantity((prev) => ({... prev, [itemId]: item_amount}))

        if (item_amount < 0) {
            errors.item_amount = "Amount can't be negative"
        }

        setErrors(errors);

        if (Object.values(errors).length) {
            return alert("Error amount can't be negative")
        };

        if (item_amount > 0) {
            const cartData = {
                item_amount
            }

            dispatch(updateCartItem(productId, cartData))

            setErrors({})
        }

    }

    const deletion = function (productId) {
        let deleted = dispatch(deleteCartItem(productId))
        if (deleted) {
            console.log("DELETED")
        }
    }

    useEffect(() => {
        dispatch(fetchCart())
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
                                    <div className='product-cart-name'>{item?.product?.item_name}</div>
                                    <div className='product-price'>${item?.product?.price}.00</div>
                                </div>
                                <form className='cart-checkout-form'>
                                    <input className='cart-quanitiy-input'
                                        type='number'
                                        onChange={(e) => setCartItems((index), e.target.value)}
                                        placeholder={item?.item_amount}
                                        value={cartQuantity[index]}
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
                    <NavLink exact to="/checkout">
                        <button type='button' disabled={disabled}>CHECKOUT</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
