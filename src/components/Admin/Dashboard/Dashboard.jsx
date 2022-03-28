import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<nav
						id='sidebarMenu'
						className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
						<div className='position-sticky pt-3'>
							<ul className='nav flex-column vh-100'>
								<li className='nav-item'>
									<Link to='/' className='nav-link text-success shadow mb-5'>
										<i className='fas fa-home mr-2'></i> Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='manage-trips' className='nav-link'>
									<i class="fa-solid fa-globe mr-2"></i> Manage Trips
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='manage-bookings' className='nav-link'>
										<i className='fas fa-home mr-2'></i> Manage Bookings
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					<main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
						<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
							<h1 className='h2'>Dashboard</h1>
							<div className='btn-toolbar mb-2 mb-md-0'>
								<button
									type='button'
									className='btn btn-sm btn-outline-secondary'>
									Logout
								</button>
							</div>
						</div>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
