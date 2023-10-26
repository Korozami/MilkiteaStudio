import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchProducts, createProduct } from '../../store/product';
import { createImage } from '../../store/productImage';
import './productform.css'


function ProductForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const productData = useSelector(state => state.products.products)
    const allProducts = productData ? Object.values(productData.products) : []
    const [ item_name, setItemName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ size, setSize ] = useState();
    const [ price, setPrice ] = useState();
    const [ category, setCategory ] = useState();
    const [ quantity, setQuantity ] = useState();
    const [ image, setImage ] = useState();
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        const errors ={};

        if(description.length < 10 && description.length != 0) {
            errors.description = "Description should be greater than 10"
        }

        if(price < 0) {
            errors.price = "Price can't be less than 0"
        }

        if(quantity < 0) {
            errors.quantity = "Quantity can't be less than 0"
        }

        if (quantity.includes(".")) {
            errors.quantity = "Quantity can't be a decimal"
        }

        setErrors(errors)
    }, [price, quantity, description])

    const handleAddProduct = async (e) => {

        e.preventDefault();

        const productData = {
            item_name,
            description,
            size,
            price,
            category,
            quantity
        }

        await dispatch(createProduct(productData))

        if(image) {
            const productId = allProducts[allProducts.length - 1].id
            const formData = new FormData();
            formData.append("image", image);
            await dispatch(createImage(productId + 1, formData))
        }

        history.push("/admin/products")
        setErrors({})

    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Add a new product</div>
            </div>
            <form encType='multipart/form-data' className='address-form' onSubmit={handleAddProduct} >
                <div className='address-section'>
                    <div className='form-label'>Name of Product</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder='Product Name'
                        required
                    />
                    <div className='form-label'>Description</div>
                    <textarea className='form-input-textarea'
                        type='textarea'
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Descripe your product'
                        required
                        />
                    <div className='error-blocks'>
                            {errors.description && (<p className="error">*{errors.description}</p>)}
                    </div>
                    <div className='form-label'>Size (Optional)</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setSize(e.target.value)}
                        placeholder='size'
                        />
                    <div className='form-label'>Price</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='$0.00'
                        required
                        />
                    <div className='error-blocks'>
                            {errors.price && (<p className="error">*{errors.price}</p>)}
                    </div>
                    <div className='form-label'>Category (optional)</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder='Category'
                        />
                    <div className='form-label'>Quantity</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder='Product Amount'
                        required
                        />
                    <div className='error-blocks'>
                            {errors.quantity && (<p className="error">*{errors.quantity}</p>)}
                    </div>
                    <div className='form-label'>Add an Image (optional)</div>
                    <input
                        type='file'
                        name='file-to-save'
                        accept='image/*'
                        className='image-btn'
                        onChange={(e) => setImage(e.target.files[0])}
                        />
                    <button id='address-submit-btn' type='submit'>Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;
