import React, { useState, useEffect } from "react";
import Axios from "axios";
import { axiosWithAuth } from "../utils/axiosCreds";
import User from "./User";

Axios.defaults.withCredentials = true;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4001/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {users.length > 0 &&
        users.map((elem) => {
          return <User key={elem.id} user={elem.username} />;
        })}
    </div>
  );
};

export default Users;
