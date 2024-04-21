import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Orderuser {
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
  customer_address: string;
  productid: string;
}

interface Productuser {
  product_name: string;
  price: string;
  color: string;
  stock: string;
  code: string;
  brand_name: string;
  _id: string;
}

const Updateorder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Orderuser>({
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    customer_address: "",
    productid: "",
  });
  const [products, setProducts] = useState<Productuser[]>([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const back = () => {
    navigate("/home/order/view");
  };
  useEffect(() => {
    enrolls();
    enroll();
  }, []);

  async function enrolls() {
    try {
      console.log("products");
      let result = await axios.get("http://localhost:4000/products");
      console.log(result);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  // order get

  async function enroll() {
    try {
      console.log("order");
      let result = await axios.get("http://localhost:4000/orders/" + id);
      console.log("result:", result);
      setOrder(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  //  trainer update
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const Updateorder = (e: FormEvent) => {
    e.preventDefault();

    update();
    goToTop();

    // console.log(user)

    if (!error) {
      msg && navigate("/home/order/view");
    }
  };
  async function update() {
    try {
      let asser = await axios.put("http://localhost:4000/orders/" + id, order);
      console.log(asser);
      setMsg(asser.data);

      setError("");
    } catch (error: any) {
      console.log(error);
      console.log("error:", error.response.data);
      setError(error.response.data);
    }
  }
  return (
    <>
      <div className="m-5 movetop">
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>
      <div className=" bg-white m-5 border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2  text-dark p-2 px-3">Update Course</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
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
              Trainer Name :
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
            <button className="btn btn-primary mt-4 px-2" onClick={Updateorder}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateorder;
