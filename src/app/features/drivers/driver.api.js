import api from "../../api/axios";

export const getAllDrivers = async (params) => {
  let response = await api.get("/drivers", { params });
  return response.data;
};

export const updateDriver = async (id, data) => {
  let response = await api.put(`/drivers/${id}`, data);
  return response.data;
};
