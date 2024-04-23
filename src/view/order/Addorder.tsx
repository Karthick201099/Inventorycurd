import axios from "axios";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  product_name: string;
  price: string;
  color: string;
  stock: string;
  code: string;
  brand_name: string;
  date: string;
  _id: string;
}

const Addorder = () => {
  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    customer_address: "",
    productid: "",
  });
  const [products, SetProducts] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    enroll();
  }, []);

  async function enroll() {
    try {
      console.log("hi");
      let result = await axios.get("http://localhost:4000/products");
      console.log(result);
      SetProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  if (!error) {
    msg;
  }
  const savepost = (e: FormEvent) => {
    e.preventDefault();
    async function post() {
      try {
        let result = await axios.post("http://localhost:4000/orders", order);
        console.log("result:", result);
        setMsg(result.data);
        goToTop();
        setOrder({
          customer_name: "",
          customer_email: "",
          customer_mobile: "",
          customer_address: "",
          productid: "",
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
          <h2 className=" h2  text-dark p-2 px-3">Add Order</h2>
          <button className="btn m-3  btn-secondary " onClick={viewall}>
            View Order
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Customer Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Customer Name"
                value={order.customer_name}
                onChange={(e) => {
                  setOrder({ ...order, customer_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Customer Email :
              </label>
            </div>
            <div className="me-3">
              <input
                type="mail"
                className="form-control ms-4 "
                placeholder="Customer Email "
                value={order.customer_email}
                onChange={(e) => {
                  setOrder({ ...order, customer_email: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                Customer Mobile :
              </label>
            </div>
            <div className="me-3">
              <input
                type="number"
                className="form-control ms-4 "
                placeholder="Customer Mobile"
                value={order.customer_mobile}
                onChange={(e) => {
                  setOrder({ ...order, customer_mobile: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label h5">
                customer_address :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="customer_address"
                value={order.customer_address}
                onChange={(e) => {
                  setOrder({ ...order, customer_address: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <label htmlFor="" className="form-label">
              Product Code :
            </label>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="code"
              id=""
              className="form-select mx-3  "
              value={order.productid}
              onChange={(e) => {
                setOrder({ ...order, productid: e.target.value });
              }}
            >
              <option value="">Prdouct Code</option>
              {products.map((product) => (
                <option key={product.code} value={product._id}>
                  {product.code}
                </option>
              ))}
            </select>
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

export default Addorder;
