import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Logo from "../image/Logo.png"
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const demoUserLogin = (e) => {
		setEmail('demo@aa.io')
		setPassword('Smithern5898')
	  }

    const adminDemoUserLogin = (e) => {
      setEmail('demoA@aa.io')
      setPassword('Smithern5898')
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="main-login">
        <div className="signup-title">Milki Tea Studios</div>
        <div className="main-login-content">
          <div className="nav-login">
					  <NavLink id="home-login" exact to="/">Home</NavLink>
            <NavLink className="link" exact to="/store">Shop</NavLink>
					  <NavLink className="link" exact to="/about">About</NavLink>
					  <NavLink className="link" exact to="/contact">Contact</NavLink>
          </div>
          <div className="text-login">
            <div className="desc-login">
              <img src={Logo} alt='logo' id='login-studio-logo' />
            </div>
          </div>
          <div className="form-login">
              <h1>Log In</h1>
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <label>
                  Email
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Log In</button>
                <button type="submit" id="demo-user-login-btn" onClick={demoUserLogin}>Log in as demo user</button>
                <button type="submit" id="demo-user-login-btn" onClick={adminDemoUserLogin}>Log in as admin demo user</button>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
