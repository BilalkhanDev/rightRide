import api from "../../api/axios";



export const getAllTrips = async (params) => {
  const response = await api.get("/trips", { params });
  return response.data;
};
