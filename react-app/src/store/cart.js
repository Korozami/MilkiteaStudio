const GET_CART = "cart/GET_CART";
const GET_CART_ITEM = "cart/GET_CART_ITEM";
const CREATE_CART_ITEM = "cart/CREATE_CART_ITEM";
const UPDATE_CART_ITEM = "cart/UPDATE_CART_ITEM";
const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM";


const setCart = (cart) => ({
    type: GET_CART,
    carts
})

const getCartItem = (cart) => ({
    type: GET_CART_ITEM,
    cart
})

const createCartItemAction = (cart) => ({
    type: CREATE_CART_ITEM,
    cart
})

const updateCartItemAction = (cart) => ({
    type: UPDATE_CART_ITEM,
    cart
})

const deleteCartItemAction = (cart) => ({
    type: DELETE_CART_ITEM,
    cart
})


export const fetchCart = () => async (dispatch) => {
    try {
        const res = await fetch("/api/carts");

        if (res.ok) {
            const data = await res.json();
            dispatch(setCart(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching cart", error)
        return error;
    }
}

export const fetchCartItem = (productId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/carts/${productId}`)

        if (res.ok) {
            const data = await res.json();
            dispatch(getCartItem(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching cart item", error)
        return error;
    }
}


export const createCartItem = (productId, cartData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/carts/${productId}/add`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cartData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createCartItemAction(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error adding cart item", error)
        return error;
    }
}


export const updateCartItem = (productId, cartData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/carts/${productId}/update`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cartData)
        })

        if (res.ok) {
            const updateData = await res.json();
            dispatch(updateCartItemAction(updateData))
            return updateData;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error updating cart", error)
        return error;
    }
}


export const deleteCartItem = (productId) => async  (dispatch) => {
    try {
        const res = await fetch(`/api/carts/${productId}/delete`, {
            method: "DELETE",
        })
        if (res.ok) {
            dispatch(deleteCartItemAction(productId))
        } else {
            const errors = await res.json();
            return errors
        }
    } catch (error) {
        console.error("Error deleting cart item", error)
        return error;
    }
}


const initialState = {};

export default function cartReducer (state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case GET_CART:
            const allCartItem = action.carts;
            newState.carts = allCartItem;
            return newState
        case GET_CART_ITEM:
            newState[action.cart.id] = action.cart;
            return newState
        case CREATE_CART_ITEM:
            newState[action.cart.id] = action.cart;
            return newState
        case UPDATE_CART_ITEM:
            newState[action.cart.id] = action.cart;
            return newState
        case DELETE_CART_ITEM:
            delete newState[action.cart];
            return newState;
        default:
            return newState;
    }
}
