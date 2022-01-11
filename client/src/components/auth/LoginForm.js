import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { loginUser } = useContext(AuthContext);
  const { username, password } = loginForm;

  const { alert, setAlert } = useState(null);

  const onChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // Navigate("/dashboard");
      } else {
        console.log(loginData);
        setAlert({ type: "danger", message: loginData.message });
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
          <Form onSubmit={login}>
            {/* <AlertMessage info={alert} /> */}
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className="input-login"
                required
                value={username}
                onChange={onChangeLogin}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                className="input-login"
                required
                value={password}
                onChange={onChangeLogin}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
            <div className="LoginButtonRegister">
              <p>Don't have an account?</p>
              <Link to="/register">
                <Button variant="info" size="sm" className="ml-2">
                  Register
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
