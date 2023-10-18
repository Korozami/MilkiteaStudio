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
