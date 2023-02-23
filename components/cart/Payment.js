import axios from "axios";
import { handleError } from "../../lib/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Payment = ({ cart, coupon, addressId }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handlePayment = async () => {

        if (addressId === null) {
            toast.error("Selecting an address is required.   ")
            return;
        }

        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/cart/paymentSend`, {
                cart,
                coupon: coupon.code,
                address_id: addressId
            })

            router.push(res.data.url);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="btn-box">
        <button onClick={handlePayment} disabled={loading} className="btn1  mt-4" id="basic-addon2">
        Payment
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
         </div>
    )
}

export default Payment;
