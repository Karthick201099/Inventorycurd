import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

interface User {
  product_name: string;
  price: string;
  color: string;
  stock: string;
  code: string;
  brand_name: string;
}

const Updateproduct = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>({
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

  const back = () => {
    navigate("/home/products/view");
  };

  useEffect(() => {
    enroll();
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function enroll() {
    try {
      let result = await axios.get("http://localhost:4000/products/" + id);
      console.log("result:", result);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const updatecourse = (e: FormEvent) => {
    e.preventDefault();
    console.log("update");
    update();

    // console.log(user)

    if (!error) {
      msg && navigate("/home/products/view");
    }
  };
  async function update() {
    try {
      let asser = await axios.put("http://localhost:4000/products/" + id, user);
      console.log(asser);
      setMsg(asser.data);
      goToTop();
      setError("");
    } catch (error: any) {
      console.log(error);
      console.log("error:", error.response.data);
      setError(error.response.data);
      goToTop();
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
              <label htmlFor="" className=" form-label">
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
              <label htmlFor="" className=" form-label">
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
              <label htmlFor="" className=" form-label">
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
              <label htmlFor="" className=" form-label">
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
            <label htmlFor="" className=" form-label">
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
            <label htmlFor="" className=" form-label">
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
            <button
              className="btn btn-primary mt-4 px-2"
              onClick={updatecourse}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateproduct;
