import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product";
import './StorePage.css';


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

    console.log(selectedCategory)

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
            <div className="displayed-products">
                {allProducts.map((product, index) => {
                    if (!(product.hide) && selectedCategory === "All") {
                        return (
                            <div key={index} className="product-container">
                                <div className="product">
                                    <img src={product?.product_images[0].imageUrl} alt='product-image' height={200}/>
                                    <div className='product-name'>{product?.item_name}</div>
                                    <div className='product-price'>${product?.price.toFixed(2)}</div>
                                </div>
                            </div>
                        )
                    } else if (product?.category.toUpperCase() === selectedCategory) {
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
