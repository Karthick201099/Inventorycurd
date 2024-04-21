import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside>
        <div className="sidebar">
          <div>
            <div className="dash pt-2">
              <Link to={"/"}>Dashboard</Link>
            </div>
            <ul className="list-group alignul">
              <li className="mid  ">
                Prdouct
                <ul>
                  <li>
                    <Link to={"/home/products/add"}>Add Product</Link>
                  </li>
                  <li>
                    <Link to={"/home/products/view"}>View Product</Link>
                  </li>
                </ul>
              </li>
              <li className="list-group ">
                Order
                <ul>
                  <li>
                    <Link to={"/home/order/add"}>Add Order</Link>
                  </li>
                  <li>
                    <Link to={"/home/order/view"}>View Order</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
