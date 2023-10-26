import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { updateProduct, fetchProductId } from '../../store/product';


function UpdateProductForm() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productData = useSelector((state) => state.products[productId])
    const history = useHistory();
    const [ item_name, setItemName ] = useState(productData?.item_name);
    const [ description, setDescription ] = useState(productData?.description);
    const [ size, setSize ] = useState(productData?.size);
    const [ price, setPrice ] = useState(productData?.price);
    const [ category, setCategory ] = useState(productData?.category);
    const [ quantity, setQuantity ] = useState(productData?.quantity);
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchProductId(productId))
    }, [dispatch, productId])

    const handleUpdateProduct = async (e) => {

        e.preventDefault();

        const productData = {
            item_name,
            description,
            size,
            price,
            category,
            quantity
        }

        await dispatch(updateProduct(productId, productData))

        history.push("/admin/products")
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Update product</div>
            </div>
            <form className='address-form' onSubmit={handleUpdateProduct} >
                <div className='address-section'>
                    <div className='form-label'>Name of Product</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setItemName(e.target.value)}
                        value={item_name}
                        required
                    />
                    <div className='form-label'>Description</div>
                    <textarea className='form-input-textarea'
                        type='textarea'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        />
                    <div className='form-label'>Size (Optional)</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                        />
                    <div className='form-label'>Price</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                        />
                    <div className='form-label'>Category (optional)</div>
                    <input className='form-input'
                        type='text'
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        />
                    <div className='form-label'>Quantity</div>
                    <input className='form-input'
                        type='number'
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                        />
                    <button id='address-submit-btn' type='submit'>Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProductForm;
