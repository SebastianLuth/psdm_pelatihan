import { vendorType } from "@/types/vendor";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllVendorData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/vendor`, {
      withCredentials: true,
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDetailVendorData = async (id: number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/vendor/${id}`,
    );
    const data = result.data.data[0];
    return data
  }catch (error) {
    throw error
  }
}

export const submitVendorData = async (formData: vendorType) => {
  try {
    await axios.post(`${baseUrl}/api/vendor`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteVendorData = async (id: number) => {
  try {
    await axios.delete(`${baseUrl}/api/vendor/${id}`);
  } catch (error) {
    throw error;
  }
}

export const updateVendorData = async (id: number, updatedData: any) => {
  try {
    await axios.patch(
      `${baseUrl}/api/vendor/${id}`,
      updatedData,
    );
  } catch (error) {
    throw error;
  }
}