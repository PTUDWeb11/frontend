import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
	state: () => {
		const token = localStorage.getItem('token');
		const user = token ? jwtDecode(token) : null;

		return {
			token,
			user,
		};
	},
	getters: {
		isLoggedIn: (state) => !!state.user,
	},
	actions: {
		login(token) {
			// decode token to get user data
			try {
				const user = jwtDecode(token);

				this.user = user;
				this.token = token;
				localStorage.setItem('token', token);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		logout() {
			this.user = null;
			this.token = null;
			localStorage.removeItem('token');
		},
	},
});
