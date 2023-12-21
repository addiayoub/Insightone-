import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showUser, storeUser, updateUser } from "../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

function AddUser() {
  const { error, loading } = useSelector((state) => state.user);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    setIsAdmin(event.target.value === "true");
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    dispatch(
      storeUser({
        username,
        password,
        passwordConfirmation,
        isAdmin,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/users");
      })
      .catch((rejectedValue) => {
        console.log(rejectedValue);
      });
  };

  return (
    <div>
      <h1>Add user</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {error?.username && <p>{error?.username}</p>}
        <br />
        <br />
        <input
          type="password"
          name="password"
          id=""
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="password_confirmation"
          id=""
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        {error?.password && <p>{error?.password}</p>}
        <br />
        <br />
        Admin{" "}
        <input
          type="radio"
          name="is_admin"
          value="true"
          onChange={handleRadioChange}
          checked={isAdmin}
        />
        User{" "}
        <input
          type="radio"
          name="is_admin"
          value="false"
          onChange={handleRadioChange}
          checked={!isAdmin}
        />
        <br />
        <br />
        <button type="submit">{loading ? "wait..." : "Add"}</button>
      </form>
    </div>
  );
}

export default AddUser;
