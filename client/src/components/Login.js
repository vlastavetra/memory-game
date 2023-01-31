import React, { useContext, useState } from "react";
import Context from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Alert, Form, Button} from 'react-bootstrap';

function Login({ onClose }) {
  const { currentUser, setCurrentUser, setLoginUser } = useContext(Context);
  const navigate = useNavigate();
const [serverError, setServerError] = useState("")
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const data = { email, password };
    try {
      const res = await axios.post("http://localhost:8080/user/login", data);
      alert("User logged successfully");
      const userId = (res.data.id);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setLoginUser(true);
      navigate("/");
      onClose();
    } catch (error) {
      console.log(error)
      setServerError(error.response.data.message);
     
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <form className="input-container" onSubmit={handleLogin}>
            <p>We've missed you!</p>
            <div
        className="text-server-error"
        style={{ display: serverError ? "block" : "none" }}
      >
        <Alert variant="danger" className="text-error-profile-settings">
          {serverError}
        </Alert>
      </div>
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
            </div>
          </form>
        </div>
      </Modal.Body>
    </>
  );
}

export default Login;
