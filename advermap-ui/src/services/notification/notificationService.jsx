import { api } from "../apis"
import { API } from "../apis/constants"

export class NotificationService {

	static countUnseen = async (token) => {

		return new Promise(async (resolve, reject) => {
			try {
				const headers = { Authorization: `Bearer ${token}` };
				const response = await api.get(API.NOTIFICATION.COUNT,{
					headers: headers
				})
				console.log(response);
				if (response.status === 200 && response.data.data) {
					resolve(response.data.data);
				} else {
					reject(response.data.message);
				}
			} catch (error) {
				reject(error.message);
			}
		});
	}


}

