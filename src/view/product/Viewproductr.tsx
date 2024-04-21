import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

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

const Viewproductr = () => {
  const [user, setuser] = useState<User[]>([]);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    enroll();
  }, []);

  async function enroll() {
    try {
      console.log("hi");
      let result = await axios.get("http://localhost:4000/products");
      // console.log(result)
      setuser(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handledelete = async (user: User) => {
    const result = await axios.delete(
      "http://localhost:4000/products/" + user._id
    );
    enroll();
    setMsg(result.data);
  };

  const adduser = () => {
    navigate("/home/products/add");
  };

  return (
    <>
      <div className="m-5 movetop">
        {msg && <p className="alert alert-success">{msg}</p>}
      </div>
      <div className=" bg-white m-5 border  rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom container">
          <h2 className=" h2 text-dark  p-2 px-3">Products</h2>
          <button className="btn m-3  btn-info" onClick={adduser}>
            Add Product
          </button>
        </div>
        <div className=" bg-light   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Code</th>
                <th>Brand Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user.product_name}</td>
                  <td>{user.price}</td>
                  <td>{user.color}</td>
                  <td>{user.stock}</td>
                  <td>{user.code}</td>
                  <td>{user.brand_name}</td>
                  <td>{user.date}</td>

                  <td>
                    <Link
                      to={`/home/products/update/${user._id}`}
                      className="text-warning d-inline h3 "
                    >
                      <FaMessage />
                    </Link>
                    <Link
                      className="text-danger d-inline ms-3 h3 "
                      onClick={() => handledelete(user)}
                      to={""}
                    >
                      <FaTrash />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Viewproductr;
