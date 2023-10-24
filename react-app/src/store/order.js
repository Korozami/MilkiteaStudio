const GET_ALL_ORDERS = "order/GET_ALL_ORDERS";
const GET_ORDER_ID = "order/GET_ORDER_ID";
const CREATE_ORDER = "order/CREATE_ORDER";
const UPDATE_ORDER = "order/UPDATE_ORDER";
const DELETE_ORDER = "order/DELETE_ORDER";


const setAllOrder = (orders) => ({
    type: GET_ALL_ORDERS,
    orders
})

const getOrderId = (order) => ({
    type: GET_ORDER_ID,
    order
})

const createOrderAction = (order) => ({
    type: CREATE_ORDER,
    order
})

const updateOrderAction = (order) => ({
    type: UPDATE_ORDER,
    order
})

const deleteOrderAction = (order) => ({
    type: DELETE_ORDER,
    order
})


export const fetchOrders = () => async (dispatch) => {
    try {
        const res = await fetch("/api/orders");
        if (res.ok) {
            const data = await res.json()
            dispatch(setAllOrder(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching orders", error)
        return error;
    }
}


export const fetchOrderId = (orderId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/orders/${orderId}`)

        if (res.ok) {
            const data = await res.json();
            dispatch(getOrderId(data))
            return data;
        } else {
            const errors = await res.json();
            return errors
        }
    } catch (error) {
        console.error("Error fetching orders", error)
        return error;
    }
}


export const createOrder = (addressId, paymentId, orderData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/orders/add/${addressId}/${paymentId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createOrderAction(data))
            return data;
        }
    } catch (error) {
        console.error("Error creating orders", error)
        return error;
    }
}


export const updateOrder = (orderId, orderData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/orders/${orderId}/update`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderData)
        })
        if (res.ok) {
            const updated = await res.json();
            dispatch(updateOrderAction(updated))
            return updated;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error updating address", error)
        return error;
    }
}


export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/orders/${orderId}/delete`, {
            method: "DELETE",
        });
        if (res.ok) {
            dispatch(deleteOrderAction(orderId))
        } else {
            const errors = await res.json();
            return errors
        }
    } catch (error) {
        console.error("Error deleting address", error)
        return error;
    }
}


const initialState = {};

export default function orderReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_ORDERS:
            const allOrder = action.orders;
            newState.orders = allOrder;
            return newState
        case GET_ORDER_ID:
            newState[action.order.id] = action.order;
            return newState
        case CREATE_ORDER:
            newState[action.order.id] = action.order;
            return newState
        case UPDATE_ORDER:
            newState[action.order.id] = action.order;
            return newState
        case DELETE_ORDER:
            delete newState[action.order]
            return newState;
        default:
            return newState;
    }
}
