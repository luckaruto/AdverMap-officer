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
}

