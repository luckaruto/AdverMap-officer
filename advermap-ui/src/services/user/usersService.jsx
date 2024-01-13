import { api, auth } from "services/apis";
import { API } from "./../apis/constants";

export class UserService {
  static async getCurrentUser() {
    try {
      //TODO: update later
      const response = await api.get('api/v1/users', {
        headers: auth(),
      });
      return {
        data: response.data
      };
    } catch (error) {
        throw error;
    }
  }

  static async updateUser( payload) {
    try {
      const response = await api.put(`api/v1/users`, payload, {
        headers: auth(),
      });
      return {
        data: response.data
      };
    } catch (error) {
        throw error;
    }
  }

  static async fetchWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.USER.LIST, {
          params: params,
          headers: headers,
        });
        console.log(response);
        if (response.status === 200 && response.data.data) {
          resolve(response.data.data.content);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
