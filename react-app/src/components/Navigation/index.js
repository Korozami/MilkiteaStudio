import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const location = useLocation();
	const sessionUser = useSelector(state => state.session.user);

	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404")  return null


	return (
		<div className='main-nav'>
			<div className='nav-content'>
				<div className='nav'>
					<NavLink exact to="/">Home</NavLink>
					<p>A Bit About Me</p>
					<p>Contact</p>
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
