import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../image/Logo.png";
import './Navigation.css';

function Navigation(){
	const location = useLocation();
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

	let link;

	if (sessionUser) {
		if(sessionUser.admin) {
			link = '/admin'
		} else {
			link = '/user/portfolio'
		}
	}

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
						<div className='user-loggin'>
							<NavLink className='link' exact to={link}>Profile</NavLink>
							<button onClick={handleLogout}> Log Out</button>
						</div>
					) : (
						<div className='user-link'>
						<NavLink className="link" exact to="/login">Login</NavLink>
						<NavLink className="link" exact to="/signup">Sign Up</NavLink>
						</div>
					)}
					<a href='https://instagram.com/milkiteastudios'>
						<i class="fa-brands fa-instagram fa-xl"></i>
					</a>
					<a href='https://youtube.com/@milkiteastudios'>
						<i class="fa-brands fa-youtube fa-xl"></i>
					</a>
					<NavLink exact to="/cart">
						<i className="fa-solid fa-cart-shopping fa-xl"></i>
					</NavLink>
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
