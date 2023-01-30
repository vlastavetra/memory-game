import React, { useContext } from "react";
import Context from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onClose }) {
  const { currentUser, setCurrentUser, setLoginUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    onClose();

    const data = { email, password };
    try {
      const res = await axios.post("http://localhost:8080/user/login", data);
      alert("User logged successfully");
      console.log(res.data);
      const userId = res.data.id;
      const token = res.data.token;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      setLoginUser(true);
      navigate("/home");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p>We've missed you!</p>
      <label className="email-label">
        Email:
        <input className="input-log" type="email" name="email" />
      </label>
      <label>
        Password:
        <input className="input-log" type="password" name="password" />
      </label>

      <div className="btns">
        <button type="submit"> Login</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
}

export default Login;
