import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import './Navbar.css';

const Navbar = () => {
	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-dark bg-transparent'>
				<div className='container'>
					<a className='navbar-brand' href='#'>
						<img src={logo} alt='' width='150px' />
					</a>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNavDropdown'
						aria-controls='navbarNavDropdown'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNavDropdown'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item dropdown '>
								<a
									className='nav-link active dropdown-toggle'
									href='#'
									id='navbarDropdownMenuLink'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'>
									Login
								</a>
								<ul
									className='dropdown-menu dropdown-box'
									aria-labelledby='navbarDropdownMenuLink'>
									<li>
										<a className='dropdown-item' href='#'>
											User Login
										</a>
									</li>
									<li>
									<Link className='dropdown-item' to='/admin-login'>
									Admin Login
								</Link>
									</li>
								</ul>
							</li>
							<li className='nav-item'>
								<Link className='nav-link active' to='/admin-dashboard'>
									Admin Dashboard
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
