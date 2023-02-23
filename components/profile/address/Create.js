

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import axios from "axios";

const Create = ({ provinces, cities }) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/create`, {
                data
            })
            toast.success('New address successfully created. ')

            console.log(res.data);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
      <div className="btn-box">
            <button className="btn1 " type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Create a new address
            </button>
            </div>
            <div className="collapse mt-3" id="collapseExample">
                <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
                    <div className="row g-4">
                        <div className="col col-md-6">
                            <label className="form-label">Title</label>
                            <input {...register('title', { required: ' The title field is required.' })} type="text" className="form-control" />
                            <div className="form-text text-danger">{errors.title?.message}</div>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label"> Contact number*</label>
                            <input {...register('cellphone', { required: '  The contact number field is required.  ', pattern: { value: /^(\+98|0)?9\d{9}$/i, message: 'فیلد شماره تماس معتبر نمیباشد' } })} type="text" className="form-control" />
                            <div className="form-text text-danger">{errors.cellphone?.message}</div>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">Postal code*</label>
                            <input {...register('postal_code', { required: ' The postal code field is required. ', pattern: { value: /^\d{5}[ -]?\d{5}$/i, message: 'فیلد کد پستی معتبر نمیباشد' } })} type="text" className="form-control" />
                            <div className="form-text text-danger">{errors.postal_code?.message}</div>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">Province</label>
                            <select {...register('province_id', { required: ' The province field is required.' })} defaultValue="" className="form-select" aria-label="Default select example">
                                <option disabled value="">Choose the province </option>
                                {provinces.map((item) => (
                                    <option key={item.id} value={item.id} >{item.name}</option>
                                ))}
                            </select>
                            <div className="form-text text-danger">{errors.province_id?.message}</div>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">City</label>
                            <select {...register('city_id', { required: '  The city field is required. ' })} defaultValue="" className="form-select" aria-label="Default select example">
                                <option disabled value=""> Choose the city</option>
                                {cities.filter((item) => item.province_id == watch('province_id')).map((item) => (
                                    <option key={item.id} value={item.id} >{item.name}</option>
                                ))}
                            </select>
                            <div className="form-text text-danger">{errors.city_id?.message}</div>
                        </div>
                        <div className="col col-md-12">
                            <label className="form-label">Address</label>
                            <textarea {...register('address', { required: 'The address field is required.' })} type="text" rows="5" className="form-control"></textarea>
                            <div className="form-text text-danger">{errors.address?.message}</div>
                        </div>
                    </div>
                    <div className="btn-box">
                        <button type="submit" disabled={loading} className="btn1 mt-4">
                        Send
                            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Create;