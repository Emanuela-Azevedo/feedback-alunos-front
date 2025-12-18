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

export const ProductAPI = {
  create: async (product) => {
    const response = await api.post("/product", product, getAuthHeaders());
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/product/all", getAuthHeaders());
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/product/${id}`, getAuthHeaders());
    return response.data;
  },
  
  getByUserId: async (id) => {
    const response = await api.get(`/product/filter/user/${id}`, getAuthHeaders());
    return response.data;
  },

  update: async (id, updatedProduct) => {
    const response = await api.put(`/product/${id}`, updatedProduct, getAuthHeaders());
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/product/${id}`, getAuthHeaders());
    return response.data;
  },
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Erro desconhecido";

    if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        message = data;
      } else if (typeof data === "object" && data.message) {
        message = data.message;
      } else if (typeof data === "object") {
        message = Object.values(data).join(" ");
      }
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);