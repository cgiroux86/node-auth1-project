import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/api/login", user)
      .then((res) => history.push("/api/users"))
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>username</label>
      <input name="username" onChange={handleChange}></input>
      <label>password</label>
      <input name="password" onChange={handleChange} type="password"></input>
      <button type="submit">Register Now!</button>
    </form>
  );
};

export default Login;
