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

	static getNotification = async (token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const headers = { Authorization: `Bearer ${token}` };
				const response = await api.get(API.NOTIFICATION.LIST,{
					headers: headers,
					params: {size: 3}
				})
				if (response.status === 200 && response.data.data && response.data.data.content) {
					resolve(response.data.data.content);
				} else {
					reject(response.data.message);
				}
			} catch (error) {
				reject(error.message);
			}
		});
	}

	static seenAll = async (token) => {
		try {
			console.log(token)
			const headers = { Authorization: `Bearer ${token}` };
			const response = await api.post(API.NOTIFICATION.SEEN_ALL, {},{
				headers: headers,
			})
			if (response.status === 200 && response.data.status === "OK") {
				return response.data.data;
			} else {
				return response.data.message;
			}
		} catch (error) {
			return error;
		}
	}

}

