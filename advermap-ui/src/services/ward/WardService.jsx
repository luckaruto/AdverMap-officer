import { api } from 'services/apis';
import { API } from '../apis/constants'; // Adjust the import based on your project structure

export class WardService {
    static async getWards(params, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.get(API.WARD, {
                    params: params,
                    headers: headers,
                });
                if (response.status === 200 && response.data.data) {
                    resolve(response.data.data.content);
                    //console.log(response.data.data.content);
                } else {
                    reject(response.data.message);
                }
            } catch (error) {
                reject(error.message);
            }
        });
    }

    static async createWard(data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.WARD, data, {
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

    static async editWard(id, data, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.post(API.WARD + `/${id}`, data, {
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

    static async deleteWard(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await api.delete(API.WARD + `/${id}`, {
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
