import React, { createContext, useContext, useEffect } from 'react';
const Auth = createContext();

export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	useEffect(() => {
		const userStore = localStorage.getItem('user');
		if (userStore) {
			setUser(JSON.parse(userStore));
			setIsAuthenticated(true);
			setLoading(false);
		}
	}, []);
	return (
		<Auth.Provider
			value={{
				isAuthenticated,
				user,
				setIsAuthenticated,
				setUser,
				loading
			}}>
			{children}
		</Auth.Provider>
	);
};

export default AuthProvider;
