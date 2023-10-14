import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../SignupFormPage/image/Logo.png"
import './Navigation.css';

function Navigation({ isLoaded }){
	const location = useLocation();
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	  };

	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404")  return null


	return (
		<div className='main-nav'>
			<div className='nav-content'>
				<div className='nav'>
					{/* <div className='store-name'>Milki Tea Studios</div> */}
					<img src={Logo} alt='logo' id='studio-logo' />
					<NavLink className="link" exact to="/">Home</NavLink>
					<NavLink className="link" exact to="/store">Shop</NavLink>
					<NavLink className="link" exact to="/about">About</NavLink>
					<NavLink className="link" exact to="/contact">Contact</NavLink>
					{sessionUser ? (
						<button onClick={handleLogout}>Log Out</button>
					) : (
						<div className='user-link'>
						<NavLink className="link" exact to="/login">Login</NavLink>
						<NavLink className="link" exact to="/signup">Sign Up</NavLink>
						</div>
					)}
				</div>
			</div>
		</div>
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>
	);
}

export default Navigation;
