import axios from "axios";

const jwtToken = localStorage.getItem("jwt") && localStorage.getItem("jwt") !== '' ? localStorage.getItem("jwt") : '';
const parsedToken = jwtToken ? JSON.parse(jwtToken) : "";

const AxiosClient = {
  async get(url: string) {
    return await axios.get(url, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    });
  },

  async post(url: string, data: object) {
    return await axios.post(url, data, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    });
  },

  async postFile(url: string, data: object) {
    return await axios.post(url, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    });
  },

  async put(url: string, data: object) {
    return await axios.put(url, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      }
    });
  },

  async delete(url: string) {
    return await axios.delete(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    });
  },
};

export default AxiosClient;
