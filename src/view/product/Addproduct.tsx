import axios from "axios";
import { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// interface User {
//   product_name: string;
//   price: string;
//   color: string;
//   stock: string;
//   code: string;
//   brand_name: string;
//   date: string;
//   _id: string;
// }
const Addproduct = () => {
  const [user, setUser] = useState({
    product_name: "",
    price: "",
    color: "",
    stock: "",
    code: "",
    brand_name: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (!error) {
    msg;
  }
  const savepost = (e: FormEvent) => {
    e.preventDefault();
    async function post() {
      try {
        let result = await axios.post("http://localhost:4000/products", user);
        console.log("result:", result);
        setMsg(result.data);
        goToTop();
        setUser({
          product_name: "",
          price: "",
          color: "",
          stock: "",
          code: "",
          brand_name: "",
        });
        setError("");
      } catch (err: any) {
        console.log(err);
        console.log("error:", err.response.data);

        setError(err.response.data);
        goToTop();
      }
    }

    post();
  };
  const viewall = () => {
    navigate("/home/products/view");
  };

  return (
    <>
      <div className="m-5 movetop">
        {error && <p className="alert alert-danger">{error}</p>}
        {msg && <p className="alert alert-success">{msg}</p>}
      </div>
      <div className=" bg-white m-5 border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2  text-dark p-2 px-3">Add Product</h2>
          <button className="btn m-3  btn-secondary " onClick={viewall}>
            View Students
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Product Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Product Name"
                value={user.product_name}
                onChange={(e) => {
                  setUser({ ...user, product_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Price :
              </label>
            </div>
            <div className="me-3">
              <input
                type="number"
                className="form-control ms-4 "
                placeholder="Price "
                value={user.price}
                onChange={(e) => {
                  setUser({ ...user, price: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Color :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="color"
                value={user.color}
                onChange={(e) => {
                  setUser({ ...user, color: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Stock :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Stock"
                value={user.stock}
                onChange={(e) => {
                  setUser({ ...user, stock: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ">
            <label htmlFor="" className=" form-label h5">
              Code :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Code"
                value={user.code}
                onChange={(e) => {
                  setUser({ ...user, code: e.target.value });
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 ">
            <label htmlFor="" className=" form-label h5">
              Brand Name :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Brand Name"
                value={user.brand_name}
                onChange={(e) => {
                  setUser({ ...user, brand_name: e.target.value });
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <button className="btn btn-primary mt-4 px-2" onClick={savepost}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addproduct;
