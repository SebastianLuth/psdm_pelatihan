import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const addUser = async (userData: any) => {
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
    const {data} = await axios.get(
      `${baseUrl}/api/user/${userId}`,
      {
        withCredentials: true,
      }
    );
    console.log("ini data dari fungsi getDetailUser", data)
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const addBawahan = async (
  atasan_username: number | undefined,
  bawahan_username: number | undefined,
  nama : string | undefined
) => {
  try {
    await axios.post(
      `${baseUrl}/api/atasan/`,
      {
        atasan_username,
        bawahan_username,
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
    const {data} = await axios.get(
      `${baseUrl}/api/user?unit_kerja=${unitKerjaId}`,
      {
        withCredentials: true,
      }
    );
    return data.data;
  } catch (error) {}
};

export const getBawahanByAtasan = async (
  atasan_username: number | undefined
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/atasan?atasan_username=${atasan_username}`,
      {
        withCredentials: true,
      }
    );
    if(response.status === 204){
      return []
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBawahan = async (
  atasan_username: number | undefined,
  bawahan_username: number | undefined
) => {
  try {
    await axios.delete(`${baseUrl}/api/atasan/`, {
      data: {
        atasan_username,
        bawahan_username
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
};
