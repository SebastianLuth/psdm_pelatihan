import { DetailCostTypeUpload, TrainingType } from "@/types/training-types";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllTraining = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/training`, {
      withCredentials: true,
    });
    const formattedData = result.data.data.map((training: TrainingType) => ({
      ...training,
      tgl_mulai: format(new Date(training.tgl_mulai), "dd MMMM yyyy"),
      tgl_selesai: format(new Date(training.tgl_selesai), "dd MMMM yyyy"),
    }));
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getJenisPelatihanData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/budget`, {
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
    const result = await axios.post(`${baseUrl}/api/training`, payload);
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
    const response = await axios.get(`${baseUrl}/api/training/${trainingId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailTrainingCost = async (trainingId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/training/${trainingId}/cost-details`
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
      `${baseUrl}/api/training/${trainingId}/cost-details`,
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
      `${baseUrl}/api/training/${trainingId}/cost-details`,
      payload
    );
  } catch (error) {
    throw error;
  }
};

export const deleteDetailCostTraining = async (trainingId: number) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/training/${trainingId}/cost-details`
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
