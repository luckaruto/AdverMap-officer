import { api } from 'services/apis';
import { API } from '../apis/constants'; // Adjust the import based on your project structure

export class DistrictService {
    static async getDistricts(params, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.get(API.DISTRICT, {
                    params: params,
                    headers: headers,
                });
                if (response.status === 200 && response.data.data) {
                    resolve(response.data.data.content);
                    console.log(response.data.data.content);
                } else {
                    reject(response.data.message);
                }
            } catch (error) {
                reject(error.message);
            }
        });
    }

    static async createDistrict(data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.DISTRICT, data, {
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

    static async editDistrict(id, data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.DISTRICT + `/${id}`, data, {
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

    static async deleteDistrict(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.delete(API.DISTRICT + `/${id}`, {
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
