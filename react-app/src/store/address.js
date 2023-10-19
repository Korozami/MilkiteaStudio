const GET_ALL_ADDRESSES = "address/GET_ALL_ADDRESSES";
const GET_ADDRESS_ID = "address/GET_ADDRESS_ID";
const CREATE_ADDRESS = "address/CREATE_ADDRESS";
const UPDATE_ADDRESS = "address/UPDATE_ADDRESS";
const DELETE_ADDRESS = "address/DELETE_ADDRESS";

//Action Creator
const setAllAddress = (addresses) => ({
    type: GET_ALL_ADDRESSES,
    addresses
})

const getAddressId = (address) => ({
    type: GET_ADDRESS_ID,
    address
})

const createAddressAction = (address) => ({
    type: CREATE_ADDRESS,
    address
})

const updateAddressAction = (address) => ({
    type: UPDATE_ADDRESS,
    address
})

const deleteAddressAction = (address) => ({
    type: DELETE_ADDRESS,
    address
})


export const fetchAddresses = () => async (dispatch) => {
    try {
        const res = await fetch("/api/addresses/");

        if (res.ok) {
            const data = await res.json();
            dispatch(setAllAddress(data));
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching addresses", error)
        return error;
    }
}


export const fetchAddressId = (addressId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/addresses/${addressId}`);

        if (res.ok) {
            const data = await res.json();
            dispatch(getAddressId(data));
            return data;
        } else {
            const errors = await res.json();
            return errors
        }
    } catch (error) {
        console.error("Error fetching address", error)
        return error
    }
}


export const createAddress = (addressData) => async (dispatch) => {
    try {
        const res = await fetch('/api/addresses/add', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(addressData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createAddressAction(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error creating address", error)
        return error;
    }
}


export const updateAddress = (addressId, updateAddressData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/addresses/${addressId}/update`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateAddressData)
        });

        if (res.ok) {
            const updateData = await res.json();
            dispatch(updateAddressAction(updateData))
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error updating address", error)
        return error;
    }
}


export const deleteAddress = (addressId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/addresses/${addressId}/delete`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteAddressAction(addressId))
        } else {
            const errors = await res.json();
            return errors
        }
    } catch (error) {
        console.error("Error deleting Address", error)
        return error;
    }
}

//Reducer

const initialState = {};

export default function addressReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_ADDRESSES:
            const allAddress = action.addresses;
            newState.addresses = allAddress;
            return newState
        case GET_ADDRESS_ID:
            newState[action.address.id] = action.address;
            return newState
        case CREATE_ADDRESS:
            newState[action.address.id] = action.address;
            return newState
        case UPDATE_ADDRESS:
            newState[action.address.id] = action.address;
            return newState
        case DELETE_ADDRESS:
            delete newState[action.address];
            return newState;
        default:
            return newState;
    }
}
