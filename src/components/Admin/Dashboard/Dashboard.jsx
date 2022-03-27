import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
	const [tripsModalShow, setTripsModalShow] = React.useState(false);
	const [dateModalShow, setDateModalShow] = React.useState(false);
	const [trips, setTrips] = React.useState([]);
	const [dateTrip, setDateTrip] = React.useState([]);

	const handleAddTripsToDate = e => {
		e.preventDefault();
		function tConvert(time) {
			// Check correct time format and split into components
			time = time
				.toString()
				.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

			if (time.length > 1) {
				// If time format correct
				time = time.slice(1); // Remove full string match value
				time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
				time[0] = +time[0] % 12 || 12; // Adjust hours
			}
			return time.join('');
		}
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/add/date', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trip_name: e.target.trip.value,
				trip_time: tConvert(e.target.time.value),
				trip_date: e.target.date.value,
			}),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setDateModalShow(false);
				setDateTrip(prev => {
					const f = prev.find(item => item.trip_date === e.target.date.value);
					if (f) {
						f?.trips.push({
							trip_name: e.target.trip.value,
							trip_time: tConvert(e.target.time.value),
						});
						return [...prev];
					} else {
						return [
							...prev,
							{
								trip_date: e.target.date.value,
								trips: [
									{
										trip_name: e.target.trip.value,
										trip_time: tConvert(e.target.time.value),
									},
								],
							},
						];
					}
				});
			});
	};

	const handleAddTrips = e => {
		e.preventDefault();
		console.log(e.target.trip.value);
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trip_name: e.target.trip.value,
			}),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setTrips([...trips, { trip_name: e.target.trip.value }]);
				console.log(trips);
				setTripsModalShow(false);
			});
	};

	const handleDeleteTrips = id => {
		const confirm = window.confirm(
			'Are you sure you want to delete this trip?'
		);
		if (confirm) {
			fetch(
				`https://tranquil-wildwood-98525.herokuapp.com/trips/delete/date/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					const newTrips = dateTrip.filter(item => item._id !== id);
					setDateTrip(newTrips);
				});
		}
	};

	React.useEffect(() => {
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/all')
			.then(res => res.json())
			.then(data => {
				setTrips(data);
			})
			.catch(err => console.log(err));
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/all/date')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setDateTrip(data);
			})
			.catch(err => console.log(err));
	}, []);
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
									<Link to='/' className='nav-link'>
										<i className='fas fa-home mr-2'></i> Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/' className='nav-link'>
									<i class="fa-solid fa-globe"></i> Manage Trips
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/' className='nav-link'>
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
