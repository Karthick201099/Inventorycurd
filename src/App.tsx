import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loginpage from "./Loginpage";
import Createuser from "./Createuser";
import Forgetpassword from "./Forgetpassword";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./view/Dashboard";
import Viewproduct from "./view/product/Viewproductr";
import Addproduct from "./view/product/Addproduct";
import Updateproduct from "./view/product/Updateproduct";
import Addorder from "./view/order/Addorder";
import Vieworder from "./view/order/Vieworder";
import Updateorder from "./view/order/Updateorder";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/createusers" element={<Createuser />}></Route>
          <Route path="/forgetpassword" element={<Forgetpassword />}></Route>

          <Route path="/home" element={<Dashboard />}>
            <Route path="products">
              <Route index path="view" element={<Viewproduct />}></Route>
              <Route path="add" element={<Addproduct />}></Route>
              <Route path="update/:id" element={<Updateproduct />}></Route>
            </Route>

            <Route path="order">
              <Route index path="add" element={<Addorder />}></Route>
              <Route path="view" element={<Vieworder />}></Route>
              <Route path="update/:id" element={<Updateorder />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
