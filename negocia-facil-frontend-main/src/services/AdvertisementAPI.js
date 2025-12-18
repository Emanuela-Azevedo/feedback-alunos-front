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

export const AdvertisementAPI = {
  create: async (advertisement) => {
    const response = await api.post("/advertisements", advertisement, getAuthHeaders());
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get("/advertisements/all", getAuthHeaders());
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/advertisements/${id}`, getAuthHeaders());
    return response.data;
  },

  update: async (id, updatedAdvertisement) => {
    const response = await api.put(`/advertisements/${id}`, updatedAdvertisement, getAuthHeaders());
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/advertisements/${id}`, getAuthHeaders());
    return response.data;
  },

  getByCategory: async (category) => {
    const response = await api.get(`/advertisements/filter`, {
      params: {
        category: category,
        page: 0,
        size: 10,
      },
      ...getAuthHeaders()
    });
    return response;
  },

  getByAdvertiserId: async (id) => {
    const response = await api.get(`/advertisements/filter/advertiser/${id}`, getAuthHeaders());
    return response;
  }
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
