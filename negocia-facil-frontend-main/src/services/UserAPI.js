import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const api = axios.create({
  baseURL: API_URL
});

export const UserAPI = {
  create: async (user) => {
    const response = await api.post("/users", user, getAuthHeaders());
    return response;
  },

  getAll: async (params) => {
    const response = await api.get("/users/all", {
        params,
        ...getAuthHeaders()
      });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`, getAuthHeaders());
    return response.data;
  },

  update: async (id, updatedUser) => {
    const response = await api.put(`/users/${id}`, updatedUser, getAuthHeaders());
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`, getAuthHeaders());
    return response.data;
  },
}

export default UserAPI;
