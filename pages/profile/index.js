import Layout from "../../components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError } from "../../lib/helper";
import Loading from "../../components/profile/Loading";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useState } from "react";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);

    const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/info`)

    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/info/edit`, {
                data
            })
            toast.success('  The information was edited successfully.   ')

            mutate(res.data);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    if (error) {
        toast.error(handleError(error))
    }

    if (!data) return <Layout><Loading /></Layout>
    return (
        <Layout>
              <form onSubmit={handleSubmit(onSubmit)} className="vh-70">
                <div className="row g-4">
                    <div className="col col-md-6">
                        <label className="form-label">Full Name</label>
                        <input {...register('name', { required: ' The first and last name field is required   ' })} defaultValue={data.name}  type="text" className="form-control" />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">Email Address</label>
                        <input {...register('email', { required: '    The family email field is required.' })} defaultValue={data.email} type="text" className="form-control" />
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">Phone Number </label>
                        <input defaultValue={data.cellphone} type="text" disabled className="form-control" />
                    </div>
                </div>
                <div className="btn-box">
                <button type="submit" disabled={loading} className="btn1 mt-4">Edit
                {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                </button>
                </div>
            </form>
        </Layout>
    )
}

export default ProfilePage;