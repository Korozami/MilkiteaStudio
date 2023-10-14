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
            <a href="#">Store</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="text-login">
            <div className="desc-login">
              <img src={Logo} alt='logo' id='login-studio-logo' />
              <h1>Welcome!!!</h1>
              <p>
                Welcome back to the joyful world of Milki Tea Studios! Here, your imagination dances freely. Immerse yourself in vibrant digital tales and explore
                charming handmade treasures, each filled with love and whimsy, including our beloved shy bunnies. Thank you for being a part of our creative family and continue collecting our wonderful treasures.
              </p>
              <div className="icon">
              </div>
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
              </form>
            </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
