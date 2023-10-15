const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_PRODUCT_ID = "products/GET_PRODUCT_ID";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

//Action Creator
const setAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const getProductId = (products) => ({
    type: GET_PRODUCT_ID,
    products
})

const createProductAction = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const updateProductAction = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

const deleteProductAction = (product) => ({
    type: DELETE_PRODUCT,
    product
})

export const fetchProducts = () => async (dispatch) => {
    try {
        const res = await fetch("/api/store");

        if (res.ok) {
            const data = await res.json();
            dispatch(setAllProducts(data));
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching products", error)
        return error;
    }
};

export const fetchProductId = (productId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/store/products/${productId}`);

        if (res.ok) {
            const data = await res.json();
            dispatch(getProductId(data));
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching products", error)
        return error;
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
        const res = await('/api/store/products/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createProductAction(data));
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error creating product", error)
        return error;
    }
}

export const updateProduct = (productId, updateProductData) => async (dispatch) => {
    try {
        const res = await(`/api/store/products/${productId}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProductData),
        });

        if (res.ok) {
            const updateData = await res.json();
            dispatch(updateProductAction(updateData));
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error updating product", error)
        return error;
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/store/products/${productId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteProductAction(productId));
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error deleting Product", error)
        return error;
    }
}

//Reducer

const initialState = {};

export default function productReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            const allProducts = action.products;
            newState.products = allProducts;
            return newState
        case GET_PRODUCT_ID:
            newState[action.product.id] = action.product;
            return newState
        case CREATE_PRODUCT:
            newState[action.product.id] = action.product;
            return newState
        case UPDATE_PRODUCT:
            newState[action.product.id] = action.product;
            return newState
        case DELETE_PRODUCT:
            delete newState[action.product];
            return newState;
        default:
            return newState;
    }
}
