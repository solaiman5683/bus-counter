import React from 'react';
import { useData } from '../../Contexts/DataContext';
import Navbar from '../Navbar/Navbar';
import styles from './style.module.css';

const Search = () => {
	const [trips, setTrips] = React.useState([]);
	const { searchTrips, setSearchTrips } = useData();
	const [search, setSearch] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/all')
			.then(res => res.json())
			.then(data => {
				setTrips(data);
			})
			.catch(err => console.log(err));

		fetch('http://localhost:8000/trips/get/date', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trip_date: searchTrips.date,
				trip_name: searchTrips.trip,
			}),
		})
			.then(res => res.json())
			.then(data => {
				setSearch(data);
				setLoading(false);
				console.log(data);
			})
			.catch(err => console.log(err));
	}, [searchTrips]);
	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		setSearch(null);
		setSearchTrips({
			trip: e.target.trip.value,
			date: e.target.date.value,
		});
	};
	return (
		<div>
			<div className={`${styles.header} pb-5`}>
				<Navbar />

				<div className='row'>
					<div className='col-md-3'></div>
					<div className='col-md-6 bg-white p-4 mt-5 shadow'>
						<form onSubmit={handleSubmit} className='row'>
							<div className='col-md-5'>
								<input type='date' name='date' className='form-control' />
							</div>
							<div className='col-md-5'>
								<select name='trip' className='form-control'>
									<option
										hidden
										className='text-primary'
										placeholder='trip'
										value='your favorite trip'>
										Your favorite trip
									</option>
									{trips?.map(trip => (
										<option key={trip._id} value={trip.trip_name}>
											{trip.trip_name}
										</option>
									))}
								</select>
							</div>
							<div className='col-md-2'>
								<button className='btn btn-primary form-control'>Search</button>
							</div>
						</form>
					</div>
					<div className='col-md-3'></div>
				</div>
			</div>
			<div className='container'>
				{/* Loading Spinner */}
				{loading ? (
					<div className='d-flex justify-content-center mt-5'>
						<div className='spinner-border' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				) : search && search.length > 0 ? (
					<table class='table table-striped table-hover mt-5'>
						<thead>
							<tr>
								<th scope='col'>#id</th>
								<th scope='col'>Time</th>
								<th scope='col'>Trips Route</th>
								<th scope='col'>Operator</th>
							</tr>
						</thead>
						<tbody>
							{search &&
								search?.map((trip, i) => (
									<tr key={i}>
										<th scope='row'>{i + 1 < 10 ? `0${i + 1}` : i}</th>
										<td>{trip.trip_time}</td>
										<td>{trip.trip_name}</td>
										<td>
											<a href='#' className='btn btn-primary'>
												Book
											</a>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					<h2 className='mt-5 text-center'>No trips found</h2>
				)}
				{/* {search && search.length > 0 ? (
					<table class='table table-striped table-hover mt-5'>
						<thead>
							<tr>
								<th scope='col'>#id</th>
								<th scope='col'>Time</th>
								<th scope='col'>Trips Route</th>
								<th scope='col'>Operator</th>
							</tr>
						</thead>
						<tbody>
							{search &&
								search?.map((trip, i) => (
									<tr key={i}>
										<th scope='row'>{i + 1 < 10 ? `0${i + 1}` : i}</th>
										<td>{trip.trip_time}</td>
										<td>{trip.trip_name}</td>
										<td>
											<a href='#' className='btn btn-primary'>
												Book
											</a>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					<h2 className='mt-5 text-center'>No trips found</h2>
				)} */}
			</div>
		</div>
	);
};

export default Search;
