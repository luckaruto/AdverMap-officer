import { api, auth } from "services/apis";
import { API } from "./../apis/constants";

export class UserService {
  static async getPermission(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.USER+`/${id}/permission`, {
          headers: headers,
        });
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
  static async getCurrentUser() {
    try {
      const response = await api.get('api/v1/users/profile', {
        headers: auth(),
      });
      return {
        data: response.data.data
      };
    } catch (error) {
        throw error;
    }
  }

  static async updateUser( payload) {
    try {
      const response = await api.post(`api/v1/users/profile`, payload, {
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
        const response = await api.get(API.USER, {
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
