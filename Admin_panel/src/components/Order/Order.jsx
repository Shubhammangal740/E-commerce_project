import React, { useEffect, useState } from "react";
import "./Order.css";

function Order() {
  const [order, setOrder] = useState([]);
  console.log(order);
  const apiUrl = "http://localhost:5000";

  const orderDetail = () => {
    fetch(`${apiUrl}/admin/order-detail`)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setOrder(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteOrder = async (orderId) => {
    await fetch(`${apiUrl}/admin/order-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    });
    await orderDetail();
  };
  useEffect(() => {
    orderDetail();
  }, []);
  return (
    <div className="list-product">
      <h1>All Order List</h1>
      <div className="listproduct-format-main list">
        <p>Order Id</p>
        <p>Total Price</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {order.map((item, i) => {
          return (
            <>
              <div
                key={i}
                className="listproduct-format-main listproduct-format list3"
              >
                <p>{item._id}</p>
                <p>${item.totalPrice} </p>
                <p
                  className="para"
                  onClick={() => {
                    DeleteOrder(item._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </p>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
