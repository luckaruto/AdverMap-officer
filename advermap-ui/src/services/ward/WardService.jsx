import { api, auth } from "services/apis";
import { API } from "./../apis/constants";

export class WardService {
  static async fetchWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.WARD.ALL, {
          params: params,
          headers: headers,
        });
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
