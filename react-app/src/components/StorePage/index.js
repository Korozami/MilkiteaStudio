import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import './StorePage.css';
import { NavLink } from 'react-router-dom';



function StorePage() {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("All")
    const productData = useSelector(state => state.products.products)
    const allProducts = productData ? Object.values(productData.products) : []

    const uniqueCategory = ["All"];

   allProducts.map((product) => {
        if (!(uniqueCategory.includes(product?.category))) {
            uniqueCategory.push(product?.category)
        }
    })

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="store-page">
            <div className="store-nav">
                <div className="store-nav-title">Categories</div>
                {uniqueCategory.map((category, index) => {
                    return (
                        <div key={index} className="category-container">
                            <div onClick={() => setSelectedCategory(category)} className="category-name">{category}</div>
                        </div>
                    )
                })}
            </div>
            <div className="displayed-shop-products">
                {allProducts.map((product, index) => {
                    let image;
                    if (product?.product_images[0]) {
                        image = product?.product_images[0].imageUrl
                    } else {
                        image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    if (!(product.hide) && selectedCategory === "All") {
                        return (
                            <div key={index} className="product-container">
                                <NavLink className='product' exact to={`/store/products/${product?.id}`}>
                                    <img src={image} alt='product-image' height={200}/>
                                    <div className='product-name'>{product?.item_name}</div>
                                    <div className='product-price'>${product?.price.toFixed(2)}</div>
                                </NavLink>
                            </div>
                        )
                    } else if (product?.category.toUpperCase() === selectedCategory.toUpperCase()) {
                        return (
                            <div key={index} className="product-container">
                                <NavLink className='product' exact to={`/store/products/${product?.id}`}>
                                    <img src={image} alt='product-image' height={200}/>
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

export default StorePage;
