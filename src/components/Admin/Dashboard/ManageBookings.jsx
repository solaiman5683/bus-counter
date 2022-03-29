import React from 'react';
import Swal from 'sweetalert2';

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

	const handleDelete = id => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'red',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true,
		}).then(result => {
			if (result.value) {
				fetch(
					`https://tranquil-wildwood-98525.herokuapp.com/booking/delete/${id}`,
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
						const newBookings = bookings.filter(item => item._id !== id);
						setBookings(newBookings);
						Swal.fire({
							title: 'Deleted!',
							text: 'Your file has been deleted.',
							icon: 'success',
						});
					});
			}
		});
	};

	return (
		<>
			<div className='bg-blur shadow-lg rounded p-4'>
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
						{bookings &&
							bookings?.map((date, index) => (
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
											onClick={() => handleDelete(date._id)}
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
