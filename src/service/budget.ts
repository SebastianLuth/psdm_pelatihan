import { budgetType } from "@/types/budget-types";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const addBudget = async (budgetData: budgetType) => {
  try {
    const result = await axios.post(`${baseUrl}/api/budget`, budgetData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
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
    throw error;
  }
};

export const getAllBudget = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/budget`, {
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
      await axios.delete(`${baseUrl}/api/budget/${id}`, {
        withCredentials: true,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getDetailBudget = async (budgetId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/budget/${budgetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCountBudgetPerYears = async (year: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/budget/count_budget?tahun_anggaran=${year}`,
      {
        withCredentials: true,
      },
    );
    const data = response.data.data;
    return data;
  }
  catch (error) {
    throw error;
  }
}


export const ExportFileBudget = async (tahunAnggaran: number) => {
  try {
      const response = await axios.get(
          `${baseUrl}/api/budget/export?tahun_anggaran=${tahunAnggaran}`,
          { 
              responseType: 'blob', 
              withCredentials: true
          } 
      );
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const ExportFileBudgetForSuperAdmin = async (tahunAnggaran: number, companyOtherRegional: number) => {
  try {
        const response = await axios.get(`${baseUrl}/api/budget/super-admin/export?tahun_anggaran=${tahunAnggaran}&&company_id=${companyOtherRegional}`, 
          { 
              responseType: 'blob', 
              withCredentials: true
          } 
        );
      return response.data;
  } catch (error) {
      throw error;
  }
};