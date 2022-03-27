import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useData } from '../../Contexts/DataContext';
import Navbar from '../Navbar/Navbar';
import styles from './style.module.css';

const Search = () => {
	const [trips, setTrips] = React.useState([]);
	const { searchTrips, setSearchTrips } = useData();
	const [search, setSearch] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [show, setShow] = React.useState(false);
	const [book, setBook] = React.useState(null);
	const [selectedSits, setSelectedSits] = React.useState([]);
	React.useEffect(() => {
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/all')
			.then(res => res.json())
			.then(data => {
				setTrips(data);
			})
			.catch(err => console.log(err));

		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/get/date', {
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
				// console.log(data);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
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
	const handleChange = e => {
		console.log(e.target.name + ' : ' + e.target.value);
		setSearchTrips({
			[e.target.name] : e.target.value,
		});
	}

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
											<span
												onClick={() => {
													setShow(true);
													setBook(trip);
												}}
												className='btn btn-primary'>
												Book
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				) : (
					<h2 className='mt-5 text-center'>No trips found</h2>
				)}
			</div>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Booking a trip for {book && book.trip_name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-12 col-md-6 px-5'>
							<h5 className='mb-4'>Bus Sit Plan - Select sit you want</h5>
							<div className='row row-cols-2 row-cols-md-4 g-4'>
								{book &&
									Object.keys(book.sits).map(item => (
										<h6 className='text-center p-2'>
											<span
												onClick={() => {
													if (book.sits[item] && !selectedSits.includes(item)) {
														Swal.fire({
															title: 'Opps ... ',
															text: 'This sit is already booked, please select another sit',
															icon: 'warning',
															confirmButtonText: 'Ok',
														});
													} else {
														const newBooks = { ...book };
														newBooks.sits[item] = !newBooks.sits[item];
														console.log(newBooks.sits);
														setBook({ ...newBooks });
														if (selectedSits.includes(item)) {
															setSelectedSits(
																selectedSits.filter(i => i !== item)
															);
														} else {
															setSelectedSits([...selectedSits, item]);
														}
													}
												}}
												className={`${book.sits[item] && 'sit-active'} ${
													selectedSits.includes(item) && 'sit-selected'
												} p-3 text-white sit-item pointer`}>
												{item}
											</span>
										</h6>
									))}
							</div>
							<div className='row mt-4'>
								<div className='col-md-4'>
									<p className='sit-active p-2 px-3 text-white sit-item pointer'></p>
									Sit booked
								</div>
								<div className='col-md-4'>
									<p className='sit-selected p-2 text-white sit-item pointer'></p>
									Sit selected
								</div>
								<div className='col-md-4'>
									<p className='p-2 text-white sit-item pointer'></p>
									Sit available
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6 px-5'>
							<form>
								<div>
									<label htmlFor='name' className='mb-1'>
										Name <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										name='name'
										onChange={handleChange}
										className='form-control'
										placeholder='Passenger Name'
									/>
								</div>
								<div className='my-2'>
									<label htmlFor='name' className='mb-1'>
										Charge <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										name='charge'
										onChange={handleChange}
										className='form-control'
										placeholder='Charge per sit ?'
									/>
								</div>
								<div className='my-2'>
									<label htmlFor='name' className='mb-1'>
										Chada <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										name='chada'
										onChange={handleChange}
										className='form-control'
										placeholder='Total chada amount'
									/>
								</div>
								<div className='my-2'>
									<label htmlFor='name' className='mb-1'>
										Other Charge <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										name='Other Charge'
										onChange={handleChange}
										className='form-control'
										placeholder='Other Charge'
									/>
								</div>
							</form>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setShow(false)}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Search;
