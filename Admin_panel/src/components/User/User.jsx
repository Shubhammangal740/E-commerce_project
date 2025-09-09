import React, { useEffect, useState } from "react";
import "./User.css";

function User() {
  const apiUrl = "http://localhost:5000";
  const [user, setUser] = useState([]);
  const userDetail = () => {
    fetch(`${apiUrl}/admin/user-detail`)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setUser(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = async (UserId) => {
    await fetch(`${apiUrl}/admin/user-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: UserId,
      }),
    });
    await userDetail();
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div className="list-product">
      <h1>All User List</h1>
      <div className="listproduct-format-main list1">
        <p>Name </p>
        <p>E-mail</p>
        <p>Created At</p>
        <p>Delete</p>
      </div>
      <div className="listproduct-allproducts ">
        <hr />
        {user.map((item, i) => {
          return (
            <>
              <div
                key={i}
                className="listproduct-format-main listproduct-format actual-list "
              >
                <p>{item.name}</p>
                <p>{item.email} </p>
                <p>{item.createdAt}</p>
                {/* <p
                  onClick={() => {
                    updateHandler(item);
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Edit
                </p> */}
                <p
                  onClick={() => {
                    deleteUser(item._id);
                  }}
                  className="user-delete"
                >
                  Delete
                </p>
                {/* <img
                  onClick={() => {
                    deleteProduct(item._id);
                  }}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                /> */}
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default User;
