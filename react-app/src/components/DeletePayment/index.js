import { useDispatch, useSelector } from "react-redux";
import { context } from "../Modal";
import { useContext, useEffect } from "react";
import { fetchPayments, deletePayment } from "../../store/payment";

function DeletePayment ({ paymentId }) {
    const dispatch = useDispatch();
    const payment = useSelector((state) => state.payments)
    console.log(payment)
    const { setModal } = useContext(context);

    const deletion = function () {
        if (payment) {
            const deleted = dispatch(deletePayment(paymentId));
            if(deleted) {
                setModal(false)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchPayments())
    }, [dispatch, setModal])

    return (
        <div className="confirmation">
            <h2 className="message">Confirm Delete</h2>
            <p className="message">Are you sure you want to delete this payment?</p>
            <div>
                <button className="yes" onClick={() => deletion()}>Yes (Delete Payment)</button>
                <button className="no" onClick={() => { setModal(false)}}>No (Keep Payment)</button>
            </div>
        </div>
    )
}

export default DeletePayment;
