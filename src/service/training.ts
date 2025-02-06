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
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getTrainingById = async (trainingId: number) => {
  try {
    const result = await axios.get(`${baseUrl}/api/training/${trainingId}`)
    const data = result.data.data.training.map((item: any) => {
      return {
        ...item,
        tgl_mulai: format(new Date(item.tgl_mulai), "dd MMMM yyyy"),
        tgl_selesai: format(new Date(item.tgl_selesai), "dd MMMM yyyy"),
      }
    })
    return data ; 
  } catch (error) {
    throw error;
  }
}

export const deleteTrainingById = async (trainingId: number) => {
  try {
    await axios.delete(`${baseUrl}/api/training/${trainingId}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
}

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
    const result = await axios.post(`${baseUrl}/api/training`, payload, {
      withCredentials: true,
    });
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
      `${baseUrl}/api/training/${trainingId}/cost-details`, {
        withCredentials: true
      }
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
        withCredentials: true,
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
      payload, {
        withCredentials: true
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteDetailCostTraining = async (trainingId: number) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/training/${trainingId}/cost-details`, {
        withCredentials: true
      }
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

export const getAdminTrainingReportAllUser = async () => {
  try {
    const result = await axios.get(`
      ${baseUrl}/api/training/checking-report
      `, {
        withCredentials: true
      })
    return result.data.data.peserta;
  } catch (error) {
    throw error;
  }
}

export  const DownloadExcelRincianBiaya = async (startDate: string, endDate: string) => {
  try {
      // Logika untuk mengunduh file Excel
      const response =await axios.get(`${baseUrl}/api/training/export?startDate=${startDate}&endDate=${endDate}`, { responseType: 'blob' });
      return response.data
  } catch (error) {
      throw error
  }
}