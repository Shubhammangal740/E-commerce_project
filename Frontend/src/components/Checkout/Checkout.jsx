import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const apiUrl = "http://localhost:5000";
  const navigate = useNavigate(); // To navigate programmatically
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  const stripePromise = loadStripe(
    "pk_test_51PkIKqRuSNCxq3yDTKhS1IvpiCSvkAzIOVnGS265whUuVQj7dVBqayqunMudL6mCvEdLXJDnFRkXeT5b7qKOQqPh00CbKehEK6"
  );

  const fetchedCartItems = async () => {
    try {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const userId = localStorage.getItem("userId");

      const response = await fetch(`${apiUrl}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ protocol, host, userId }),
      });

      if (response.status === 401) {
        // If unauthorized, navigate to login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      const resData = await response.json();
      setCartItems(resData.products);
      setTotalPrice(resData.totalPrice);
      setSessionId(resData.sessionId);

      // Store data in localStorage only if not already present
      if (!localStorage.getItem("cartItems")) {
        localStorage.setItem("orderData", JSON.stringify(resData.products));
      }
      if (!localStorage.getItem("totalPrice")) {
        localStorage.setItem("Price", resData.totalPrice);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    fetchedCartItems();
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-items">
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.product._id} className="checkout-item">
              <p>
                <strong>Product:</strong> {item.product.name}
              </p>
              <p>
                <strong>Price:</strong> ${item.totalItemPrice.toFixed(2)}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <hr />
            </div>
          ))
        )}
      </div>
      <div className="checkout-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button className="checkout-button">
        <Link to={"/order"} onClick={handleCheckout}>
          Place Order
        </Link>
      </button>
    </div>
  );
};

export default Checkout;
