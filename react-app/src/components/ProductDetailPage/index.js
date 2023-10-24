import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import { useParams } from "react-router-dom";
import './ProductDetail.css'


function ProductDetail () {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productData = useSelector((state)=> state.products.products)
    const allProducts = productData ? Object.values(productData.products) : []
    const currProduct = allProducts[productId - 1]
    const [mainImg, setMainImg] = useState(1)
    console.log(currProduct)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="product-page-container">
            <div className="product-page-wrapper">
                <div className="product-image-container">
                    {/* <div className="main-product-img">
                        {currProduct?.product_images.map((productImg, index) => {
                            if (productImg.id === mainImg) {
                                return (
                                    <div key={index} className='main-productId-img'>
                                        <img src={productImg?.imageUrl} alt="product image" />
                                    </div>
                                )
                            }
                        })}
                    </div> */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
