import { vendorType } from "@/types/vendor";
import axios from "axios";

export const getAllVendorData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/vendor`, {
      withCredentials: true,
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitVendorData = async (formData: vendorType) => {
  try {
    await axios.post(`http://localhost:5000/api/vendor`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
