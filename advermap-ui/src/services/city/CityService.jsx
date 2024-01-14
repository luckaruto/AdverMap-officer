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
      const response = await api.post(`/api/v1/cities?name=${data.name}`, {}, {
        headers: auth(),
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
      const response = await api.post(`/api/v1/cities/${id}?name=${data.name}`, {}, {
        headers: auth(),
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
      const response = await api.delete(API.CITY + `/${id}`, {
        headers: auth(),
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
