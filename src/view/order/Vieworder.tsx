import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
interface User {
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
  customer_address: string;
  product: {
    product_name: string;
    color: string;
    price: string;
  };
  _id: string;
  date: string;
}
const Vieworder = () => {
  const [user, setuser] = useState<User[]>([]);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    enroll();
  }, []);

  async function enroll() {
    try {
      console.log("hi");
      let result = await axios.get("http://localhost:4000/orders");
      // console.log(result)
      setuser(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handledelete = async (user: User) => {
    const result = await axios.delete(
      "http://localhost:4000/orders/" + user._id
    );
    enroll();
    setMsg(result.data);
  };

  const adduser = () => {
    navigate("/home/orders/add");
  };

  return (
    <>
      <div className="m-5 movetop">
        {msg && <p className="alert alert-success">{msg}</p>}
      </div>
      <div className=" bg-white m-2 border  rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom container">
          <h2 className=" h2 text-dark  p-2 px-3">Orders</h2>
          <button className="btn m-3  btn-info" onClick={adduser}>
            Add Order
          </button>
        </div>
        <div className=" bg-light   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Customer Mobile</th>
                <th>Customer Address</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Color</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user.customer_name}</td>
                  <td>{user.customer_email}</td>
                  <td>{user.customer_mobile}</td>
                  <td>{user.customer_address}</td>
                  <td>{user.product.product_name}</td>
                  <td>{user.product.color}</td>
                  <td>{user.product.price}</td>
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

export default Vieworder;
