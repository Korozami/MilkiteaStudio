import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductId } from "../../store/product";
import { useParams } from "react-router-dom";
import './ProductDetail.css'


function ProductDetail () {
    const dispatch = useDispatch();
    const { productId } = useParams()
    const productData = useSelector(state => state.products[productId])
    const [mainImg, setMainImg] = useState(1)

    useEffect(() => {
        dispatch(fetchProductId(productId))
    }, [dispatch, productId])

    return (
        <div className="product-page-container">
            <div className="product-page-wrapper">
                <div className="product-image-container">
                    <div className="main-product-img">
                        {productData.product_images.map((productImg, index) => {
                            if (productImg.id === mainImg) {
                                return (
                                    <div key={index} className='main-productId-img'>
                                        <img src={productImg?.imageUrl} alt="product image" />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="mini-image-container">
                        {productData.product_images.map((productImg, index) => {
                            if (productImg) {
                                console.log(productImg.id)
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
                            <div className="product-info-title">{productData.item_name}</div>
                            <div className="product-info-price">${productData.price.toFixed(2)}</div>
                            <div className="product-info-description">{productData.description}</div>
                            <div className="product-info-size">{productData.size}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
