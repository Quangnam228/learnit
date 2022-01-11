import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import AlertMessage from "../Layout/AlertMessage";
function RegisterForm() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { registerUser } = useContext(AuthContext);
  const { username, password, confirmPassword } = registerForm;

  const { alert, setAlert } = useState(null);

  const onChangeRegister = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "dager", message: "password do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        console.log(registerData);
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          <Form onSubmit={register}>
            {/* <AlertMessage info={alert} /> */}
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className="input-login"
                required
                value={username}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className="input-login"
                required
                value={password}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="input-login"
                required
                value={confirmPassword}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
            <div className="LoginButtonRegister">
              <p>Already have an account?</p>
              <Link to="/login">
                <Button variant="info" size="sm" className="ml-2">
                  Login
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
