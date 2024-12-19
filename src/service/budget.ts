import { budgetType } from "@/types/budget-types";
import axios from "axios";
import Swal from "sweetalert2";

export const addBudget = async (budgetData: budgetType) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/api/budget`,
      budgetData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (result.status === 201) {
      await Swal.fire({
        title: "Success!",
        text: "Berhasil Menambahkan Anggaran",
        icon: "success",
        confirmButtonText: "OK",
      });
      window.location.reload();
    }
  } catch (error) {
    console.error("Error adding budget:", error);
  }
};

export const getAllBudget = async () => {
  try {
    const result = await axios.get(`http://localhost:5000/api/budget`, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBudget = async (id: number | undefined) => {
  try {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text:
        "Data Anggaran ini akan dihapus secara permanen dan data-data pelatihannya juga akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/budget/${id}`, {
        withCredentials: true,
      });
    }
  } catch (error) {
    throw error
  }
};
