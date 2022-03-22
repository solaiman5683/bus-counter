import React, { createContext, useContext } from 'react';
const Auth = createContext();

export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [user, setUser] = React.useState({});
	return <Auth.Provider value={{
		isAuthenticated,
		user,
		setIsAuthenticated,
		setUser
	}}>{children}</Auth.Provider>
};

export default AuthProvider;
