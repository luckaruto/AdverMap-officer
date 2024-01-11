import { api } from "../apis"
import { API } from "../apis/constants"

export class AuthService {
	
	static login = async (data) => {
		try {
			const response = await api.post(API.AUTH,data)
			return {
				status: response.status,
				message: response.data.message,
				data: response.data.data
			};
		} catch (error) {
			throw error
		}
	}

	static forgotPassword = async (data) => {
		try {
			const response = await api.post(API.FORGOT_PASSWORD,data)
			return {
				status: response.status,
				message: response.data.message
			};
		} catch (error) {
			throw error
		}
	}

	static verifyOtp = async (data) => {
		try {
			const response = await api.post(API.VERIFY_OTP,data)
			return {
				status: response.status,
				message: response.data.message
			};
		} catch (error) {
			throw error
		}
	}

	static resetPassword = async (data) => {
		try {
			const response = await api.post(API.RESET_PASSWORD,data)
			return {
				status: response.status,
				message: response.data.message
			};
		} catch (error) {
			throw error
		}
	}

	static refreshToken = async ({headers}) => {
		try {
			const response = await api.post(API.REFRESH_TOKEN, {},{
				headers: headers
			})
			return {
				status: response.status,
				message: response.data.message,
				data: response.data.data,
			};
		} catch (error) {
			throw error
		}
	}
}

