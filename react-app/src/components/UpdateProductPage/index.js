import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { updateProduct, fetchProductId } from '../../store/product';
import { createImage } from '../../store/productImage';



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
    const [ image, setImage ] = useState();
    const [ errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchProductId(productId))
    }, [dispatch, productId])

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

    const handleUpdateProduct = async (e) => {

        e.preventDefault();

        if (Object.values(errors).length) {
            return alert("Error please fix the underlying problems")
        };

        const productData = {
            item_name,
            description,
            size,
            price,
            category,
            quantity
        }

        await dispatch(updateProduct(productId, productData))

        if(image) {
            const formData = new FormData();
            formData.append("image", image);
            await dispatch(createImage(productId, formData))
        }

        history.push("/admin/products")
        setErrors({})
    }

    return (
        <div className='address-form-container'>
            <div className='address-form-heading-container'>
                <div className='address-form-header'>Update product</div>
            </div>
            <form encType='multipart/form-data' className='address-form' onSubmit={handleUpdateProduct} >
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
                    <div className='error-blocks'>
                            {errors.description && (<p className="error">*{errors.description}</p>)}
                    </div>
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
                    <div className='error-blocks'>
                            {errors.price && (<p className="error">*{errors.price}</p>)}
                    </div>
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
                    <button id='address-submit-btn' type='submit'>Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProductForm;
