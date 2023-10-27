import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import Logo from "../image/Logo.png"
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState("")
	const [middlename, setMiddleName] = useState("")
	const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
        const data = await dispatch(signUp(first_name, last_name, username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="main-signup">
        <div className="signup-title">Milki Tea Studios</div>
        <div className="main-signup-content">
          <div className="nav-signup">
            <NavLink id="home-signup" exact to="/">Home</NavLink>
            <NavLink className="link" exact to="/store">Shop</NavLink>
					  <NavLink className="link" exact to="/about">About</NavLink>
					  <NavLink className="link" exact to="/contact">Contact</NavLink>
          </div>
          <div className="text-signup">
            <div className="desc-signup">
              <img src={Logo} alt='logo' id='login-studio-logo' />
            </div>
          </div>
          <div className="form-signup">
              <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                  <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <label>
                    First Name
                    <input
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </label>
                  {/* <label>
                    Middle Name
                    <input
                      type="text"
                      value={middlename}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </label> */}
                  <label>
                    Last Name
                    <input
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </label>
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
                    Username
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                  <label>
                    Confirm Password
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </label>
                  <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
