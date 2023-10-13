import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstname, setFirstName] = useState("")
	const [middlename, setMiddleName] = useState("")
	const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
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
            <NavLink id="home-login" exact to="/">Home</NavLink>
            <a href="#">Store</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="text-signup">
            <div className="desc-signup">
              <div className="sign-up-logo">
              </div>
              <h1>Welcome!!!</h1>
              <p>Step into the joyful world of Milki Tea Studios! Here, your imagination dances freely! Dive into our vibrant
                digital artworks, each a tale to be discovered. Explore the charming handmade treasures, filled with the love and
                whimsy of shy bunnies. Join our creative family and enjoy your new treasures
              </p>
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
                      value={firstname}
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
                      value={lastname}
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
