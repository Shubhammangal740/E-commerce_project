import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import AllProducts from "../../components/AllProducts/AllProducts";
import User from "../../components/User/User";
import Order from "../../components/Order/Order";

function Admin() {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/addproduct" element={<AddProduct></AddProduct>}></Route>
        <Route
          path="/addproduct/:productId"
          element={<AddProduct></AddProduct>}
        ></Route>
        <Route
          path="/allproducts"
          element={<AllProducts></AllProducts>}
        ></Route>
        <Route path="/user" element={<User></User>}></Route>
        <Route path="/order-detail" element={<Order></Order>}></Route>
      </Routes>
    </div>
  );
}

export default Admin;
