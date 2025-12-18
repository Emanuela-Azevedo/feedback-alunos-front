import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const api = axios.create({
  baseURL: API_URL
});

export const RuleAPI = {
  create: async (rule) => {
    const response = await api.post("/rules", rule, getAuthHeaders());
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("rules/all", getAuthHeaders());
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/rules/${id}`, getAuthHeaders());
    return response.data;
  },

  update: async (id, updatedRule) => {
    const response = await api.put(`/rules/${id}`, updatedRule, getAuthHeaders());
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/rules/${id}`, getAuthHeaders());
    return response.data;
  },
}

export default RuleAPI;