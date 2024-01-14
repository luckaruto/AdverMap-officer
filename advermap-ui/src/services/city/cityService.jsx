import { api, auth } from 'services/apis';
import { API } from '../apis/constants';

export class CityService {
  static async getCities() {
    try {
      const response = await api.get(API.CITY, {
        headers: auth(),
      });

      if (response.status === 200 && response.data.data) {
        return response.data.data.content;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createCity(data, token) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.post(API.CITY, data, {
        headers: headers,
      });

      if (response.status === 200 && response.data.data) {
        return response.data.status;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async editCity(id, data, token) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.put(API.CITY + `/${id}`, data, {
        headers: headers,
      });

      if (response.status === 200 && response.data.data) {
        return response.data.status;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteCity(id, token) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.delete(API.CITY + `/${id}`, {
        headers: headers,
      });

      if (response.status === 200 && response.data.data) {
        return response.data.status;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
