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
