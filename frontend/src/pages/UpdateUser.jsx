import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showUser, updateUser } from "../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

function UpdateUser() {
  const { username } = useParams();
  const { userData, error, loading } = useSelector((state) => state.user);
  const [usernameUpdated, setUsernameUpdated] = useState();
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
      updateUser({
        id: userData._id,
        user: {
          username: usernameUpdated,
          password,
          passwordConfirmation,
          isAdmin,
        },
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

  useEffect(() => {
    dispatch(showUser({ username }))
      .unwrap()
      .then((resolvedPayload) => {
        setIsAdmin(resolvedPayload.isAdmin);
        setUsernameUpdated(resolvedPayload.username);
      })
      .catch((rejectedValue) => {
        // Handle the error case
        navigate("/users");
        console.log("erro", rejectedValue);
      });
  }, [dispatch, username, navigate]);

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="username"
          value={usernameUpdated}
          onChange={(event) => setUsernameUpdated(event.target.value)}
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
        <button type="submit">{loading ? "wait..." : "Update"}</button>
      </form>
    </div>
  );
}

export default UpdateUser;
