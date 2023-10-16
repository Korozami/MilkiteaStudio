import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import './StorePage.css';


function StorePage() {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.products.products)
    const allProducts = productData ? Object.values(productData.products) : []

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="store-page">
            <div className="store-nav">

            </div>
            <div className="displayed-products">
                {allProducts.map((product, index) => {
                    if (!(product.hide)) {
                        return (
                            <div key={index} className="product-container">
                                <div className="product">
                                    <img src={product?.product_images[0].imageUrl} alt='product-image' height={200}/>
                                    <div className='product-name'>{product?.item_name}</div>
                                    <div className='product-price'>${product?.price.toFixed(2)}</div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default StorePage;
