import { api } from "services/apis";
import { API } from "./../apis/constants";
import { DataArrayTwoTone } from "@mui/icons-material";

export class SpaceService {
  static async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(API.SPACE);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getWithParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }; // Fix: Use an object for headers
        const response = await api.get(API.SPACE, {
          params: params,
          headers: headers,
        });
        if (response.status === 200) {
          resolve(response.data.data.content);
        } else {
          reject(response.data);
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
        const response = await api.post(API.SPACE, data, {
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
