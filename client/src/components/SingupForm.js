import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUnlockAlt,
  faUser,


} from "@fortawesome/free-solid-svg-icons";

function SignupForm({ onClose }) {
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  lastName: "",
  firstName: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/signup",
        user
      );
      if (response.status === 200) {
        alert("User created successfully");
        setUser("");
        onClose();
      }
    } catch (error) {
      {
        setServerError(error.response.data.message);
      }
    }
  };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <p>Create an account here</p>
      <div
        className="text-server-error"
        style={{ display: serverError ? "block" : "none" }}
      >
        <Alert variant="danger" className="text-error-profile-settings">
          {serverError}
        </Alert>
      </div>
      <div className="form-first-part">
        <Form.Group controlId="username">
          <div className="input-icon">
            <Form.Control
              type="text"
              onChange={handleChange}
              // id="username"
              value={user.username}
              placeholder="Enter your username"
            />
            <span className="icon-profile">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </Form.Group>
        <Form.Group controlId="firstName">
          <div className="input-icon">
            <Form.Control
              type="text"
              onChange={handleChange}
              // id="firstName"
              value={user.firstName}
              placeholder="Enter your first name"
            />
            <span className="icon-profile">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </Form.Group>
        <Form.Group controlId="lastName">
          <div className="input-icon">
            <Form.Control
              type="text"
              onChange={handleChange}
              // id="lastName"
              value={user.lastName}
              placeholder="Enter your last name"
            />
            <span className="icon-profile">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </Form.Group>
        <Form.Group controlId="email">
          <div className="input-icon">
            <Form.Control
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={user.email}
            />
            <span className="icon-profile">
              <FontAwesomeIcon icon={faEnvelope} title="Email" />
            </span>
          </div>
        </Form.Group>

        <Form.Group controlId="password">
          <div className="input-icon">
            <Form.Control
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Enter a new password"
              value={user.password}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            <span className="icon-profile">
              <FontAwesomeIcon icon={faUnlockAlt} title="Password" />
            </span>
          </div>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <div className="input-icon">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Confirm new password"
              value={user.confirmPassword}
            />
            <span
              className="eye-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
            <span className="icon-profile">
              <FontAwesomeIcon icon={faLock} title="Confirm Password" />
            </span>
          </div>
        </Form.Group>
      </div>
 
      <div className="btns">
        <Button type="submit" className="submit-btn-signup">Sign Up</Button>
        <Button type="button" className="cancel-btn-signup" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
export default SignupForm;