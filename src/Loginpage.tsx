import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Loginpage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const savepost = (e: FormEvent) => {
    e.preventDefault();
    async function post() {
      try {
        let result = await axios.post(
          "http://localhost:4000/auth/login",
          login
        );
        console.log("result:", result);
        navigate("/home");
        setMsg(result.data);
      } catch (error: any) {
        console.log(error);
        setError(error.response.data);

        setLogin({
          email: "",
          password: "",
        });
      }
    }

    post();
  };
  return (
    <>
      <div className="vh-100  text-center d-flex align-items-center justify-content-center backgroundimg">
        <div className="w-50 justify-content-center py-5 d-flex flex-column bg-white border  rounded gradient">
          <p className="h1 px-4 me-5">Login</p>
          <p className="h5 text-secondary pb-2">Sign in to your Account</p>
          <form action="" className=" form-group">
            <div className="row justify-content-center">
              <div className="col-7  justify-content-center mb-3 ">
                <input
                  type="text"
                  placeholder="Mail Id"
                  className="form-control "
                  value={login.email}
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value });
                  }}
                />
              </div>
              <div className="col-7  justify-content-center mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={login.password}
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              {msg && <p className="text-success">{msg}</p>}
              {!msg && <p className="text-danger">{error}</p>}
            </div>
            <div className="mt-3">
              <button className="btn btn-info me-5" onClick={savepost}>
                Login
              </button>
              <Link to="/forgetpassword" className="ms-5">
                Forgetpassword?
              </Link>
            </div>
          </form>
          <Link to="/createusers" className="mt-3 hi">
            Create Your Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
