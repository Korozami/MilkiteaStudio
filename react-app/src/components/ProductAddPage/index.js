import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createProduct } from '../../store/product';
import './productform.css'


function ProductForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ item_name, setItemName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ size, setSize ] = useState("");
    const [ price, setPrice ] = useState();
    const [ category, setCategory ] = useState("");
    const [ quantity, setQuantity ] = useState();
    const [ image, setImage ] = useState();
    const [ errors, setErrors] = useState({});

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

        let res = await dispatch(createProduct(productData));

        if (res) {
            history.push("/admin/products")
        }
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Add a new product</div>
            </div>
            <form className='address-form' onSubmit={handleAddProduct} >
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
                    <button id='address-submit-btn' type='submit'>Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm;
