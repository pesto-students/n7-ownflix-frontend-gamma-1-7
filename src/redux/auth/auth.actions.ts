import { LOGIN, LOGOUT } from './auth.types';

export const login = () => {
	return {
		type: LOGIN,
	};
};
export const logout = () => {
	return {
		type: LOGOUT,
	};
};
