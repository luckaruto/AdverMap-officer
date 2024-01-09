import { api } from "../apis"
import { API } from "../apis/constants"

export class NotificationService {

	static countUnseen = async ({headers}) => {
		try {
			const response = await api.get(API.NOTIFICATION.COUNT,{
				headers: headers
			})

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

