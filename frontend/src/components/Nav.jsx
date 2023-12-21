import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";

function Nav() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };
  return (
    <nav className="nav" style={{ margin: "10px 0 10px 250px" }}>
      {user && (
        <>
          <span>
            {user.username} * {user.role === 305 ? "Admin" : "user"}
          </span>
          <Link to="/users">Manage users</Link>
          <button onClick={handelClick}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Nav;
