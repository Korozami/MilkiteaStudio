const GET_ALL_PAYMENTS = "payment/GET_ALL_PAYMENTS";
const GET_PAYMENT_ID = "payment/GET_PAYMENT_ID";
const CREATE_PAYMENT = "payment/CREATE_PAYMENT";
const UPDATE_PAYMENT  = "payment/UPDATE_PAYMENT";
const DELETE_PAYMENT = "payment/DELETE_PAYMENT";


const setAllPayment = (payments) => ({
    type: GET_ALL_PAYMENTS,
    payments
})

const getPaymentId = (payment) => ({
    type: GET_PAYMENT_ID,
    payment
})

const createPaymentAction = (payment) => ({
    type: CREATE_PAYMENT,
    payment
})

const updatePaymentAction = (payment) => ({
    type: UPDATE_PAYMENT,
    payment
})

const deletePaymentAction = (payment) => ({
    type: DELETE_PAYMENT,
    payment
})

export const fetchPayments = () => async (dispatch) => {
    try {
        const res = await fetch("/api/payments/");

        if(res.ok) {
            const data = await res.json();
            dispatch(setAllPayment(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching payments", error)
        return error;
    }
}


export const fetchPaymentId = (paymentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/payments/${paymentId}`)

        if(res.ok) {
            const data = await res.json();
            dispatch(getPaymentId(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching payment", error)
        return error;
    }
}


export const createPayment = (paymentData) => async (dispatch) => {
    try {
        const res = await fetch('/api/payments/add', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paymentData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createPaymentAction(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error creating payment", error)
        return error;
    }
}


export const updatePayment = (paymentId, paymentData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/payments/${paymentId}/update`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paymentData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(updatePaymentAction(paymentData))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error updating payment", error)
        return error;
    }
}


export const deletePayment = (paymentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/payments/${paymentId}/delete`, {
            method: "DELETE",
        })
        if (res.ok) {
            dispatch(deletePaymentAction(paymentId))
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error deleting payment", error)
        return error;
    }
}


const initialState = {};

export default function paymentReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PAYMENTS:
            const allPayment = action.payments;
            newState.payments = allPayment;
            return newState
        case GET_PAYMENT_ID:
            newState[action.payment.id] = action.payment;
            return newState
        case CREATE_PAYMENT:
            newState[action.payment.id] = action.payment;
            return newState
        case UPDATE_PAYMENT:
            newState[action.payment.id] = action.payment;
            return newState
        case DELETE_PAYMENT:
            delete newState[action.payment];
            return newState;
        default:
            return newState;
    }
}
