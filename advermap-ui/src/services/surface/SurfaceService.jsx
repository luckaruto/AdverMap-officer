import { api } from "services/apis";
import { API } from "./../apis/constants";

export class SurfaceServices {
  static async getWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.SURFACE, {
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
        const response = await api.post(API.SURFACE, data, {
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
  static async edit(id,data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(API.SURFACE+`/${id}`, data, {
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
        const response = await api.delete(API.SURFACE + `/${id}`, {
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
      const response = await api.post(API.SURFACE + `/request/${id}/cancel`,{}, {
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


