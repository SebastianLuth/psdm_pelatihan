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
                },
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