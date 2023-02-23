import { useState } from "react";
import { toast } from "react-toastify"
import axios from "axios";
import { useSWRConfig } from 'swr'
import { handleError } from "../../../lib/helper";

const Delete = ({ id }) => {
    const [loading, setLoading] = useState(false)

    const { mutate } = useSWRConfig()

    const handleDelete = async () => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/delete`, {
                address_id: id
            })
            toast.success(' The address was deleted successfully.')

            mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="btn-box ">
        <button onClick={handleDelete} disabled={loading} className="btn mt-4 btn-dark">
            Delete
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
        </div>
    )
}

export default Delete;