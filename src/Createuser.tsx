import axios from "axios";
import { FormEvent, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Createuser = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  const registerpost = (e: FormEvent) => {
    e.preventDefault();

    async function post() {
      try {
        console.log("reg");
        console.log(register);
        let result = await axios.post(
          "http://localhost:4000/login/signinusers",
          register
        );
        console.log("result:", result);

        navigate("/");
        setMsg(result.data);
      } catch (err: any) {
        console.log(err);
        console.log("error:", err.response.data);
        setError(err.response.data);
        console.log(err.response.data.message);
      }
    }

    post();
  };
  const reverse = () => {
    navigate("/");
  };
  return (
    <>
      <div className="vh-100  text-center d-flex align-items-center justify-content-center backgroundimg">
        <div className="w-50 justify-content-center py-5 d-flex flex-column bg-white border rounded gradient">
          <p className="h2 px-4 ">Register</p>
          <p className="h5 text-secondary pb-2">Create your Account</p>
          <div className="arrow">
            <FaArrowAltCircleLeft size="30px" onClick={reverse} />
          </div>
          <form action="" className=" form-group">
            <div className="row justify-content-center">
              <div className="col-9  justify-content-center mb-3 ">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-control "
                  value={register.name}
                  onChange={(e) => {
                    setRegister({ ...register, name: e.target.value });
                  }}
                />
              </div>
              <div className="col-9  justify-content-center mb-3 ">
                <input
                  type="text"
                  placeholder="Enter Your Mail Id"
                  className="form-control "
                  value={register.email}
                  onChange={(e) => {
                    setRegister({ ...register, email: e.target.value });
                  }}
                />
              </div>
              <div className="col-9  justify-content-center mb-3 ">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control "
                  value={register.password}
                  onChange={(e) => {
                    setRegister({ ...register, password: e.target.value });
                  }}
                />
              </div>
              <div className="col-9  justify-content-center mb-3 ">
                <input
                  type="text"
                  placeholder=" Repeat Password"
                  className="form-control "
                  value={register.confirm_password}
                  onChange={(e) => {
                    setRegister({
                      ...register,
                      confirm_password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-9  justify-content-center mb-3 ">
                <input
                  type="number"
                  placeholder="Mobile Number"
                  className="form-control "
                  value={register.mobile}
                  onChange={(e) => {
                    setRegister({
                      ...register,
                      mobile: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div>
              {msg && <p className="text-success">{msg}</p>}
              {!msg && <p className="text-danger">{error}</p>}
            </div>

            <div className="mt-3 text-start  get">
              <button className="btn btn-info " onClick={registerpost}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Createuser;
