import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import { fetchCart, createCartItem } from "../../store/cart";
import { useParams } from "react-router-dom";
import './ProductDetail.css'


function ProductDetail () {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productData = useSelector((state)=> state.products.products)
    const testing = useSelector((state) => state);
    console.log(testing)
    const allProducts = productData ? Object.values(productData.products) : []
    const currProduct = allProducts[productId - 1]
    const [quantity, setQuantity] = useState(1)
    const [mainImg, setMainImg] = useState(1)

    let item_amount = Number(quantity)
    console.log(item_amount)

    useEffect(() => {
        dispatch(fetchCart())
        dispatch(fetchProducts());
    }, [dispatch])

    const handleAddCartItem = async (e) => {

        e.preventDefault();

        const cartData = {
            item_amount
        }

        await dispatch(createCartItem(productId, cartData))

        alert("Item added to cart!")


    }

    return (
        <div className="product-page-container">
            <div className="product-page-wrapper">
                <div className="mini-image-container">
                    {currProduct?.product_images.map((productImg, index) => {
                        if (productImg) {
                            return (
                                <div onClick={() => {setMainImg(productImg.id)}} key={index} className='product-img'>
                                    <img src={productImg?.imageUrl} alt="product image" />
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="info-container">
                    <div className="info-wrapper">
                        <div className="product-info-title">{currProduct?.item_name.toUpperCase()}</div>
                        <div className="product-info-price">${currProduct?.price.toFixed(2)}</div>
                        <div className="product-info-description">{currProduct?.description}</div>
                        <div className="product-info-size">{currProduct?.size}</div>
                        <div className="product-info-note">Please note the colors in the photos may not accurately represent those of the actual product!</div>
                        <select className="product-info-quanity" name="quantity" onChange={(e) => setQuantity(e.target.value)}>
                        {
                            [...Array(10)].map((_, i) => i + 1).map(i => <option key={i} value={i}>Qty: {i}</option>)
                        }
                        </select>
                        <button onClick={handleAddCartItem} className="add-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
