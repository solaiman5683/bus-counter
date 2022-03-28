import React from 'react';

const ManageBookings = () => {
	const [bookings, setBookings] = React.useState([]);

	React.useEffect(() => {
		fetch('https://tranquil-wildwood-98525.herokuapp.com/booking/all')
			.then(res => res.json())
			.then(data => {
				setBookings(data);
				console.log(data);
			})
			.catch(err => console.log(err));
	}, []);
	return (
		<>
			<div className='bg-white shadow-lg rounded p-4'>
				<h2 className='text-center mb-4'>Manage Bookings</h2>
				<table class='table'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>Selected Sits</th>
							<th scope='col'>Charge</th>
							<th scope='col'>Chada</th>
							<th scope='col'>Other Charge</th>
							<th scope='col'>Total Charge</th>
							<th scope='col'>Grand Total</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{bookings && bookings?.map((date, index) => (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								<td>{date.passenger_name}</td>
								<td>
									{date.sit_selected?.map((sit, index) => (
										<span key={index}>{sit}, </span>
									))}
								</td>
								<td>{date.charge}</td>
								<td>{date.chada}</td>
								<td>{date.other_charges}</td>
								<td>{date.total}</td>
								<td>{date.grand_total}</td>
								<td>
									<button
										onClick={() => bookings(date._id)}
										className='btn btn-info text-white rounded-pill mx-2'>
										Approve
									</button>
									<button
										onClick={() => bookings(date._id)}
										className='btn btn-danger rounded-pill mx-2'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ManageBookings;
