import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/product";
import { NavLink, Link } from 'react-router-dom';
import './adminproducts.css'


function AdminProductPage() {
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

    const deletion = function (product) {
        if(product) {
            const deleted = dispatch(deleteProduct(product));
            if (deleted) {
                console.log("Successfully deleted")
            }
        }
    }


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="admin-store-page">
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
            <div className="admin-displayed-products">
                <NavLink className="product-add" exact to="/admin/products/add">
                    <div className='product-add-container'>
                        <i className='material-icons' id='add-btn'>add</i>
                        <div className='adding-label'>Add Product</div>
                    </div>
                </NavLink>
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
                                <Link to={`/store/products/${product?.id}/update`}>
                                    <button className="product-edit-btn">Update</button>
                                </Link>
                                <button onClick={() => deletion(product?.id)} className="product-edit-btn">Delete</button>
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
                                <Link to={`/store/products/${product?.id}/update`}>
                                    <button className="product-edit-btn">Update</button>
                                </Link>
                                <button onClick={() => deletion(product?.id)} className="product-edit-btn">Delete</button>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default AdminProductPage;
