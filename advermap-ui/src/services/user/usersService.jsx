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
}
