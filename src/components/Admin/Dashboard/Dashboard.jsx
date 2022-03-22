import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Dashboard = () => {
	const [tripsModalShow, setTripsModalShow] = React.useState(false);
	const [dateModalShow, setDateModalShow] = React.useState(false);
	const [trips, setTrips] = React.useState([]);
	const [dateTrip, setDateTrip] = React.useState([]);

	const handleAddTripsToDate = e => {
		e.preventDefault();
		console.log(e.target.trip.value);
		console.log(e.target.date.value);
		fetch('https://tranquil-wildwood-98525.herokuapp.com/trips/add/date', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				trip_name: e.target.trip.value,
				trip_date: e.target.date.value,
			}),
		})
			.then(res => res.json())
			.then(data => {
                console.log(data);
                setDateModalShow(false);
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
                setTrips(prev => [...prev, e.target.trip.value]);
                setTripsModalShow(false);
			});
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
			<div className='bg-secondary vh-100 d-flex justify-content-center align-items-center'>
				<div className='w-75 bg-white shadow-lg rounded pt-4'>
					<h2 className='text-center mb-4'>Manage Trips</h2>
					<p style={{ textAlign: 'right' }}>
						<button
							className='btn btn-primary rounded-pill mx-2'
							onClick={() => setTripsModalShow(true)}>
							Add New Trips
						</button>
						<button
							className='btn btn-primary rounded-pill mx-2'
							onClick={() => setDateModalShow(true)}>
							Add Trips to Date
						</button>
					</p>
					<table class='table table-striped'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Date</th>
								<th scope='col'>Trips</th>
								<th scope='col'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{dateTrip.map((date, index) => (
								<tr key={index}>
									<th scope='row'>{index + 1}</th>
									<td>{date.trip_date}</td>
                                    <td>
                                        <ul>
                                            {date.trips.map((trip, index) => (
                                                <li key={index}>{trip}</li>
                                            ))}
                                        </ul>
                                    </td>
									<td>
										<button className='btn btn-danger rounded-pill mx-2'>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Modal
				show={tripsModalShow}
				onHide={() => setTripsModalShow(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Add New Trips
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleAddTrips}>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>Trip Name</label>
							<input
								type='text'
								className='form-control'
								name='trip'
								required
								aria-describedby='emailHelp'
								placeholder='Enter Trip Name'
							/>
						</div>
						<button className='btn btn-primary text-uppercase form-control mt-4'>
							Add
						</button>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={dateModalShow}
				onHide={() => setDateModalShow(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Add Trips to Date
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleAddTripsToDate}>
						<input
							placeholder='Date'
							name='date'
							type='date'
							className='form-control'
							required
						/>

						<br />
						<select name='trip' className='form-control' required>
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

						<button className='btn btn-primary text-uppercase form-control mt-4'>
							Add
						</button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Dashboard;