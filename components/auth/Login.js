import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify"

const Login = ({ setStep }) => {
    const { login, loading } = useContext(AuthContext);
    const [cellphone, setCellphone] = useState('')

    const handleLogin = async () => {
        if (cellphone === '') {
            toast.error('Mobile number is required.');
            return;
        }
        const pattern = /^(\+98|0)?9\d{9}$/;
        if (!pattern.test(cellphone)) {
            toast.error('The mobile number format is not valid.')
            return;
        }

        await login(cellphone)

        setStep(2)
    }
    return (
    <div>
      <form className="row gx-3 gy-2 align-items-center">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone Number
          </label>

          <div className="input-group w-100">
            <span className="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                ></path>
              </svg>
            </span>
            <input onChange={(e) => setCellphone(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Input Phone Number"
              aria-label="Input group example"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="btn-box">
        <button onClick={handleLogin} disabled={loading} className="btn1 btn-auth">
          Login
          {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
