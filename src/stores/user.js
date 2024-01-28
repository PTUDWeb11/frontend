import config from "@/config/index.js";
import Cart from "@/models/cart.js";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => {
		const token = localStorage.getItem("token");
		let user = null;
		if (token) {
			try {
				user = jwtDecode(token);
			} catch (error) {
				console.error("Failed to decode token:", error);
				// Handle decoding errors (e.g., clear the token or redirect to login)
			}
		}
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
				localStorage.setItem("token", token);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		logout() {
			this.user = null;
			this.token = null;
			localStorage.removeItem("token");
		},

		async updateProfile(payload) {
			const patchResponse = await fetch(
				"https://poshop-ea528.ondigitalocean.app/user/profile",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.token}`,
					},
					body: JSON.stringify(payload),
				}
			);

			const patchResult = await patchResponse.json();
			if (!patchResponse.ok) {
				throw new Error(patchResult.message || "Error updating profile");
			}

			// Nếu cập nhật thành công, lấy thông tin người dùng mới
			if (patchResult.success) {
				const getResponse = await fetch(
					"https://poshop-ea528.ondigitalocean.app/user/profile",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}
				);
				const updatedUserData = await getResponse.json();
				console.log(updatedUserData);
				if (!getResponse.ok) {
					throw new Error("Error fetching updated user data");
				}

				// Cập nhật store với thông tin người dùng mới
				this.$patch({
					user: updatedUserData.data,
				});
			}
		},

		async changePassword(payload) {
			try {
				const response = await fetch(
					"https://poshop-ea528.ondigitalocean.app/user/password",
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${this.token}`,
						},
						body: JSON.stringify({
							current: payload.currentPassword,
							password: payload.newPassword,
						}),
					}
				);

				const data = await response.json();
				if (!response.ok) {
					// Instead of throwing a generic error, handle the validation messages
					if (data.errors) {
						// Assuming the server sends back an object with a key 'errors'
						// containing the validation issues
						return { errors: data.errors };
					}
					throw new Error(data.message || "Failed to change password.");
				}

				return data;
			} catch (error) {
				throw error;
			}
		},

		async getUserCart() {
			console.log(this.token);
			return fetch(`${config.APIEndpoint}/user/items`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			})
				.then((response) => {
					console.log(response);
					return response.json();
				})
				.then((obj) => obj.data)
				.then((data) => {
					return Cart.toCardItems(data);
				});
		},
	},
});
