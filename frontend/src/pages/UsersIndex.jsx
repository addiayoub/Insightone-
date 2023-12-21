import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../redux/actions/UserActions";
import { Link } from "react-router-dom";

function UsersIndex() {
  const { users, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handelDelete = async (id) => {
    try {
      dispatch(deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (loading) {
    return <h1>loading ...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <h1>user list</h1>
      <button>
        <Link to="/users/create">Add user</Link>
      </button>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <h3>{user.username}</h3>
            <span>{user.isAdmin ? "Admin User" : "Simple User"}</span>
            <button onClick={() => handelDelete(user._id)}>delete</button>
            <button>
              <Link to={`/users/${user.username}/edit`}>Update</Link>
            </button>
          </div>
        );
      })}
    </>
  );
}

export default UsersIndex;
