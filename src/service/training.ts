import { DetailCostTypeUpload, TrainingType } from "@/types/training-types";
import axios from "axios";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllTraining = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/training`, {
      withCredentials: true,
    });
    const formattedData = result.data.data.map((training: TrainingType) => ({
      ...training,
      tgl_mulai: parseISO(training.tgl_mulai), 
      tgl_selesai: parseISO(training.tgl_selesai), 
    }));
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getTrainingById = async (trainingId: number) => {
  try {
    const result = await axios.get(`${baseUrl}/api/training/${trainingId}`)
    return result.data; 
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

export const updateTraining = async (trainingId: number, trainingData: any) => {
  try {
    const result = axios.put(`${baseUrl}/api/training/${trainingId}`, trainingData, {
      withCredentials: true,
    })
    return {
      message : "Berhasil Mengubah Pelatihan",
      result
    }
  } catch (error) {
    throw error
  }
}

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
      const response =await axios.get(`
        ${baseUrl}/api/training/export?startDate=${startDate}&endDate=${endDate}`, 
        { 
          withCredentials: true,
          responseType: 'blob'
         }
      );
      return response.data
  } catch (error) {
      throw error
  }
}

export  const DownloadExcelRincianBiayaOtherRegional = async (startDate: string, endDate: string, company_id: number) => {
  try {
      // Logika untuk mengunduh file Excel
      const response =await axios.get(`
        ${baseUrl}/api/training/super-admin/export?startDate=${startDate}&endDate=${endDate}&company_id=${company_id}
        `, 
        { 
          withCredentials: true,
          responseType: 'blob' 
        });
      return response.data
  } catch (error) {
      throw error
  }
}