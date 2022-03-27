import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import UserLogin from './components/UserLogin/UserLogin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Search from './components/Search/Search';
import ManageTrips from './components/Admin/Dashboard/ManageTrips';
// import 'sweetalert2/src/sweetalert2.scss'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<div>Not Found</div>} />
				<Route path='admin-login' element={<Admin />} />
				<Route path='user-login' element={<UserLogin />} />
				<Route
					path='admin-dashboard/*'
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route path='*' element={<Navigate to='manage' />} />
					<Route path='manage' element={<ManageTrips />} />
				</Route>
				<Route path='search' element={<Search />} />
			</Routes>
		</div>
	);
}

export default App;
