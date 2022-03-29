import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AdminContext';
import logo from '../../img/logo.png';
import './Navbar.css';

const Navbar = () => {
	const { user, logout } = useAuth();
	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-dark bg-transparent'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>
						<img src={logo} alt='' width='150px' />
					</Link>
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
									href='/'
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
										<Link className='dropdown-item' to='/user-login'>
											User Login
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' to='/admin-login'>
											Admin Login
										</Link>
									</li>
								</ul>
							</li>
							{user && (
								<>
									<li className='nav-item'>
										<Link className='nav-link active' to='/admin-dashboard'>
											Admin Dashboard
										</Link>
									</li>
									<li className='nav-item ms-4' onClick={logout}>
										<span className='btn btn-danger'>Logout</span>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
