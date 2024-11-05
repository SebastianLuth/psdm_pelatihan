import axios from "axios";

export const addUnitKerja = async (unitKerja: string[]) => {
    try {
        if (!unitKerja) {
            throw new Error("Unit kerja tidak boleh kosong");
        }
        await axios.post(
            "http://localhost:5000/api/unitkerja",
            { unit_kerja: unitKerja },
            {
              withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error adding unit kerja:", error);
    }
};

export const getUnitKerja = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/unitkerja", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching unit kerja:", error);
    }
}