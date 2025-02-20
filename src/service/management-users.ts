import { FinalData, UserDataToAdd } from "@/types/manajement-users-type";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const addUser = async (userData: UserDataToAdd) => {
  try {
    await axios.post(
      `${baseUrl}/api/auth/signup`,
      { ...userData },
      { withCredentials: true }
    );
    await Swal.fire({
      title: "Berhasil!",
      text: "User berhasil ditambahkan.",
      icon: "success",
      confirmButtonText: "OK",
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export const getDetailUser = async (userId: number) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/${userId}`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const addEvaluator = async (
  user_id: number,
  evaluator_id: number,
  nama: string | undefined,
  kategori: string
) => {
  try {
    await axios.post(
      `${baseUrl}/api/evaluator/`,
      {
        user_id,
        evaluator_id,
        kategori
      },
      {
        withCredentials: true,
      }
    );
    await Swal.fire({
      title: "Berhasil!",
      text: `${nama} berhasil ditambahkan`,
      icon: "success",
      confirmButtonText: "OK",
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export const getAllDataBawahanInUnitKerja = async (unitKerjaId: number) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/user?unit_kerja=${unitKerjaId}`,
      {
        withCredentials: true,
      }
    );
    return data.data;
  } catch (error) {}
};

export const getEvaluator = async (
  evaluator_id : number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluator?user_id=${evaluator_id}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 204) {
      return [];
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBawahan = async (
  user_id: number | undefined,
  evaluator_id: number | undefined
) => {
  try {
    await axios.delete(`${baseUrl}/api/evaluator/`, {
      data: {
        user_id,
        evaluator_id,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (
  userId: number,
  finalData: FinalData,
  foto_profil: File | null
) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/user/${userId}`,
      {
        finalData,
        foto_profil,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Gagal memperbarui data pengguna");
    }
    Swal.fire("Berhasil", "Data pengguna berhasil diperbarui!", "success");
  } catch (error) {}
};
