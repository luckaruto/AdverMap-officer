import { api } from 'services/apis';
import { API } from '../apis/constants'; // Adjust the import based on your project structure

export class CityService {
    static async getCities(params, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.get(API.CITY, {
                    params: params,
                    headers: headers,
                });
                if (response.status === 200 && response.data.data) {
                    resolve(response.data.data.content);
                   // console.log(response.data.data.content);
                } else {
                    reject(response.data.message);
                }
            } catch (error) {
                reject(error.message);
            }
        });
    }

    static async createCity(data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.CITY, data, {
                    headers: headers,
                });

                if (response.status === 200 && response.data.data) {
                    resolve(response.data.status);
                } else {
                    reject(new Error(response.data.message || "Failed to create city"));
                }
            } catch (error) {
                reject(new Error("Failed to create city"));
            }
        });
    }

    static async editCity(id, data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.CITY + `/${id}`, data, {
                    headers: headers,
                });
                if (response.status === 200 && response.data.data) {
                    resolve(response.data.status);
                } else {
                    reject(response.data.message);
                }
            } catch (error) {
                reject(error.message);
            }
        });
    }

    static async deleteCity(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.delete(API.CITY + `/${id}`, {
                    headers: headers,
                });
                if (response.status === 200 && response.data.data) {
                    resolve(response.data.status);
                } else {
                    reject(response.data.message);
                }
            } catch (error) {
                reject(error.message);
            }
        });
    }
}
