import React from 'react';
import { useData } from '../../Contexts/DataContext';
import Navbar from '../Navbar/Navbar';
import styles from './style.module.css';

const Search = () => {
	const [trips, setTrips] = React.useState([]);
	const { searchTrips, setSearchTrips } = useData();
	React.useEffect(() => {
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/all')
			.then(res => res.json())
			.then(data => {
				setTrips(data);
			})
			.catch(err => console.log(err));
	}, []);
	const handleSubmit = e => {
		e.preventDefault();
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
								<input type='date' className='form-control' />
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
						<tr>
							<th scope='row'>1</th>
							<td>12.30 PM</td>
							<td>Dhaka to Sylhet</td>
                            <td>
                                <a href='#' className='btn btn-primary'>
                                    Book
                                </a>
                            </td>
						</tr>
						<tr>
							<th scope='row'>2</th>
							<td>3.30 PM</td>
							<td>Dhaka to Sylhet</td>
                            <td>
                                <a href='#' className='btn btn-primary'>
                                    Book
                                </a>
                            </td>
						</tr>
						<tr>
							<th scope='row'>3</th>
							<td>9.30 PM</td>
							<td>Dhaka to Sylhet</td>
                            <td>
                                <a href='#' className='btn btn-primary'>
                                    Book
                                </a>
                            </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Search;
