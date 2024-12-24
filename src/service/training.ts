import { DetailCostTypeUpload } from "@/types/training-types";
import axios from "axios";
import Swal from "sweetalert2";

export const getJenisPelatihanData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/budget`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addTraining = async (
  jumlah_peserta: any,
  peserta: any,
  trainingData: any
) => {
  try {
    const payload = {
      ...trainingData,
      jumlah_peserta: jumlah_peserta,
      peserta: peserta,
    };
    const result = await axios.post(
      `http://localhost:5000/api/training`,
      payload
    );
    if (result.status === 201) {
      await Swal.fire({
        title: "Success!",
        text: "Berhasil Menambahkan Pelatihan",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getTrainingData = async (trainingId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/training/${trainingId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailTrainingCost = async (trainingId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/training/${trainingId}/cost-details`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFileTrainingCost = async (
  formData: FormData,
  trainingId: number
) => {
  try {
    await axios.post(
      `http://localhost:5000/api/training/${trainingId}/cost-details`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const updateDetailCostTraining = async (
  trainingId: number,
  payload: DetailCostTypeUpload
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/training/${trainingId}/cost-details`,
      payload
    );
  } catch (error) {
    throw error;
  }
};

export const deleteDetailCostTraining = async (trainingId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/training/${trainingId}/cost-details`
    );
    if (response.status === 200) {
      await Swal.fire({
        title: "Success!",
        text: "Berhasil Menghapus Detail Anggaran",
        icon: "success",
        confirmButtonText: "OK",
      });
      return true;
    }
  } catch (error) {
    throw error;
  }
};
