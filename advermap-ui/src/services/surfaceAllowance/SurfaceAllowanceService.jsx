import { api } from "services/apis";
import { API } from "../apis/constants";

export class SurfaceAllowanceService {
  static async getWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.SURFACE_ALLOWANCE, {
          params: params,
          headers: headers,
        });
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
  static async getRequestsWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.SURFACE_ALLOWANCE + `/request`, {
          params: params,
          headers: headers,
        });
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
  static async create(data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE_ALLOWANCE, data, {
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
  static async edit(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE_ALLOWANCE + `/${id}`, data, {
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
  static async requestEdit(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE_ALLOWANCE + `/${id}/process`, data, {
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
  static async cancelRequest(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE_ALLOWANCE + `/${id}/cancel`,{}, {
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
  static async responseRequest(id,data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE_ALLOWANCE + `/${id}/process`,data, {
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
  static async delete(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.delete(API.SURFACE_ALLOWANCE + `/${id}`, {
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
