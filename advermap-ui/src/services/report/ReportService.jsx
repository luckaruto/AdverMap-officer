import { api } from "services/apis";
import { API } from "./../apis/constants";

export class ReportService {
  static async getById(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get(API.REPORT + `/${id}`, {
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
  static async getWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get(API.REPORT, {
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
  static async delete(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.delete(API.REPORT + `/type/${id}`, {
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
        const response = await api.post(API.REPORT, data, {
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
        const response = await api.post(API.REPORT + `/type/${id}`, data, {
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

  static async response(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(
          API.REPORT + `/${id}/process`,
          data,
          {
            headers: headers,
          }
        );
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
  static async cancel(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.post(
          API.REPORT + `/${id}/cancel`,
          {},
          {
            headers: headers,
          }
        );
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
