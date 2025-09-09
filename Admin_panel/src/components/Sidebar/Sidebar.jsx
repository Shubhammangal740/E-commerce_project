import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import user_icon from "../../assets/New_user_icon.png";
import order_icon from "../../assets/New_order_icon .png";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/allproducts"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>All Products</p>
        </div>
      </Link>
      <Link to={"/user"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item user">
          <img src={user_icon} alt="" />
          <p>User</p>
        </div>
      </Link>
      <Link to={"/order-detail"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item order">
          <img src={order_icon} alt="" />
          <p>Orders</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
