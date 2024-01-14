import { api, auth } from 'services/apis';
import { API } from '../apis/constants';

export class DistrictService {
  static async getDistricts() {
    try {
      const response = await api.get(`/api/v1/districts`, {
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

  static async createDistrict(data, token) {
    try {
      const response = await api.post(`/api/v1/districts?name=${data.name}&cityId=${Number(data.cityId)}`, {}, {
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

  static async editDistrict(id, data, token) {
    try {
      const response = await api.post(`/api/v1/districts/${id}?name=${data.name}&cityId=${Number(data.cityId)}`, {}, {
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

  static async deleteDistrict(id, token) {
    try {
      const response = await api.delete(`/api/v1/districts/${id}`, {
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
