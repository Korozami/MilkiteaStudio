import './Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import compilation from '../image/compilation.jpg';
import React, { useEffect } from "react";
import { fetchProducts } from "../../store/product";
import { NavLink } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.products.products)
    const allProducts = productData ? Object.values(productData.products) : []

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className='main-home'>
            <div className='main-img'>
                <img src={compilation} alt='compilation of products' />
            </div>
            <div className='home-title'>
                <h1>Featured Products</h1>
            </div>
            <div className='displayed-products'>
                {allProducts.map((product, index) => {
                    if (product.display) {
                        return (
                            <div key={index} className='product-container'>
                                <NavLink className='product' exact to={`/store/products/${product?.id}`}>
                                    {/* {product?.product_images.map((productImg, index) => {
                                        console.log(productImg);
                                        if (productImg) {
                                            return (
                                                <div key={index} className='product-img'>
                                                    <img src={productImg?.imageUrl} alt="product image" />
                                                </div>
                                            )
                                        }
                                    })} */}
                                    <img src={product?.product_images[0].imageUrl} alt='product-image' height={200}/>
                                    <div className='product-name'>{product?.item_name}</div>
                                    <div className='product-price'>${product?.price.toFixed(2)}</div>
                                </NavLink>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default HomePage;
