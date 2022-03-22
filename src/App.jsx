import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Admin/Dashboard/Dashboard';

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<div>Not Found</div>} />
				<Route path='admin-login' element={<Admin />} />
				<Route path='admin-dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
