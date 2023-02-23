import axios from "axios";
import { handleError } from "../../lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const Coupon = ({ coupon, setCoupon }) => {
    const [loading, setLoading] = useState(false)

    const handleCheckCoupon = async () => {
        console.log(coupon);
        if (coupon.code === '' || coupon.code === null) {
            toast.error("     Coupon code must be entered.")
            return;
        }

        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/cart/checkCoupon`, {
                code: coupon.code
            })
            toast.success('Your discount code has been applied.    ');

            setCoupon({ ...coupon, percent: res.data.percentage });

        } catch (err) {
            toast.error(handleError(err))
            setCoupon({ code: null, percent: 0 });
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="input-group mb-3">
            <input onChange={(e) => setCoupon({ ...coupon, code: e.target.value })} type="text" className="form-control" placeholder="Discount code " />
            <button onClick={handleCheckCoupon} disabled={loading} className="input-group-text" id="basic-addon2">
            Apply discount code
                {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
            </button>
        </div>
    )
}

export default Coupon;