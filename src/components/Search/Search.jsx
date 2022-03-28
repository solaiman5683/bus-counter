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
	const [booking, setBooking] = React.useState(null);
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
	const handleBooking = e => {
		e.preventDefault();
		const bookingData = {
			trip_name: book.trip_name,
			passenger_name: booking.name,
			trip_date: searchTrips.date,
			trip_time: book.trip_time,
			trip_price: booking.charge,
			sit_selected: selectedSits,
			sits: book.sits,
			charge: booking.charge,
			chada: booking.chada,
			other_charges: booking.otherCharge,
			total: selectedSits.length * parseFloat(booking.charge),
			grand_total:
				selectedSits.length * booking.charge +
				parseFloat(booking.otherCharge) +
				parseFloat(booking.chada),
			trip_id: search._id,
		};
		console.log(bookingData);
		fetch('https://tranquil-wildwood-98525.herokuapp.com/booking/add/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bookingData),
		})
			.then(res => res.json())
			.then(data => {
				Swal.fire({
					title: 'Booking Successful',
					text: 'You have successfully booked a trip',
					icon: 'success',
					confirmButtonText: 'OK',
				});
				setShow(false);
				setBooking(null);
				setBook(null);
				setSearch(null);
				setSelectedSits([]);
				setLoading(false);
			})
			.catch(err => console.log(err));
	};
	const handleChange = e => {
		if (!selectedSits.length) {
			Swal.fire({
				title: 'Please Select a Seat',
				text: 'Please select a seat to continue',
				icon: 'warning',
				confirmButtonText: 'Ok',
			});
		} else {
			setBooking(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		}
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
				) : search && search?.trip?.length > 0 ? (
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
								search?.trip?.map((trip, i) => (
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
									Object.keys(book.sits).map((item, i) => (
										<h6 className='text-center p-2' key={i}>
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
							<form onSubmit={handleBooking}>
								<div>
									<label htmlFor='name' className='mb-1'>
										Name <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										name='name'
										value={booking?.name}
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
										type='number'
										name='charge'
										value={booking?.charge}
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
										type='number'
										name='chada'
										value={booking?.chada}
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
										type='number'
										name='otherCharge'
										value={booking?.otherCharge}
										onChange={handleChange}
										className='form-control'
										placeholder='Other Charge'
									/>
								</div>
								<div className='my-2'>
									<p className='mb-1'>
										Selected Sits <span className='text-danger'>*</span>
									</p>
									{selectedSits.length > 0 &&
										selectedSits.map((item, index) => (
											<span key={index} className=''>
												{item},{' '}
											</span>
										))}
								</div>

								<div className='mt-4 border border-2 p-2'>
									<p className='mb-1'>
										Total Amount : &#2547;{' '}
										{booking && selectedSits.length * booking.charge}
									</p>
									<p className='mb-1'>
										Grand Total : &#2547;{' '}
										{booking &&
											selectedSits.length * booking.charge +
												parseFloat(booking.chada) +
												parseFloat(booking.otherCharge)}
									</p>
								</div>
								<div className='my-2'>
									<button
										type='submit'
										className='btn btn-success btn-gradient form-control'>
										Book Now
									</button>
								</div>
							</form>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setShow(false)} className='btn-danger'>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Search;
