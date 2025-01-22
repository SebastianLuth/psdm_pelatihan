import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Menambahkan Unit Kerja
export const addUnitKerja = async (unitKerja: string[]) => {
    try {
        if (!unitKerja) {
            throw new Error("Unit kerja tidak boleh kosong");
        }
        await axios.post(
            `${baseUrl}/api/unitkerja`,
            { unit_kerja: unitKerja },
            {
              withCredentials: true,
            }
        );
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

// Mendapatkan Unit Kerja
export const getUnitKerja = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/unitkerja`, {
            withCredentials: true,
        });
        
        return response.data.data;
    } catch (error) {
        console.error("Error fetching unit kerja:", error);
    }
}

// Delete Unit Kerja
export const deleteUnitKerja = async (unitKerjaId: number) => {
    try {
        axios.delete(`${baseUrl}/api/unitkerja/${unitKerjaId}`, {
            withCredentials: true,
          })
    } catch (error) {
        console.error("Error deleting unit kerja:", error);
    }
}

// Featch Detail Unit Kerja
export const getDetailUnitKerja = async (departmentId: number) => {
    try {
        const {data} = await axios.get(`${baseUrl}/api/unitkerja/${departmentId}`, 
            {
            withCredentials: true
        });
        return data.data;
    } catch (error) {   
        console.error("Error fetching detail unit kerja:", error);
    }
}

export const updateUnitKerja = async (departmentId: number, newUnitKerja: string) => {
    try { 
        await axios.put(`${baseUrl}/api/unitkerja/${departmentId}`, {
            unit_kerja : newUnitKerja
        },{
            withCredentials: true
        })
      } catch (error) {
        console.error(error);
      }
}