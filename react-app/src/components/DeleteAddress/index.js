import { useDispatch, useSelector } from "react-redux";
import { context } from "../Modal";
import { useContext, useEffect } from "react";
import { fetchAddresses, deleteAddress } from "../../store/address";

function DeleteAddress ({ addressId }) {
    const dispatch = useDispatch();
    const address = useSelector((state) => state.addresses)
    const { setModal } = useContext(context);

    const deletion = function () {
        if(address) {
        const deleted = dispatch(deleteAddress(addressId));
        if(deleted) {
            setModal(false)
        }}
    }

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch, setModal])

    return (
        <div className="confirmation">
            <h2 className="message">Confirm Delete</h2>
            <p className="message">Are you sure you want to delete this address?</p>
            <div>
                <button className="yes" onClick={() => deletion()}>Yes (Delete Address)</button>
                <button className="no" onClick={() => { setModal(false)}}>No (Keep Address)</button>
            </div>
        </div>
    )
}

export default DeleteAddress;
