import axios from "axios";
import { apiUrl } from "./config";

export const getSchedulesApi = async (date, machineName=null) => {
  try {
    const params = {
      date: date,
      machine_name: machineName,
    };

    const response = await axios.get(`${apiUrl}/getSchedules`, { params });
    return response;
  } catch (error) {
    throw error;
  }
};
