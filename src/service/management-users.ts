import axios from "axios";
import Swal from 'sweetalert2';

export const addUser = async (userData: any) => {
  try {
    await axios.post(
      'http://localhost:5000/api/auth/signup',
      { ...userData },
      { withCredentials: true }
    );
    await Swal.fire({
      title: 'Berhasil!',
      text: 'User berhasil ditambahkan.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
};
