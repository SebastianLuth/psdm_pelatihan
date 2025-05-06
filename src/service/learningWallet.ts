import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface FormData {
  nama: string;
  judul: string;
  biaya: string;
  jpl: string;
  vendor: string;
  noVendor: string;
}

interface RKAPData {
  username: string | number;
  nama: string;
  biaya_rkap_lw: number;
  rkap_jpl: number;
  rkap_tahun: number;
}

interface ExcelRow {
  NIKSAP: string;
  Nama: string;
  "RKAP Biaya Learning Wallet": number;
  "RKAP Jam Pembelajaran Learning Wallet": number;
  "Rkap Tahun": number;
}

export const submitRealisasiLearningWallet = async (
  formData: FormData,
  files: {
    fotoPelatihan: File | null;
    fotoStruk: File | null;
    fotoMateri: File | null;
    fotoSertifikat: File | null;
  },
  username: number | string
) => {
  try {
    const form = new FormData();

    // Append text data
    form.append("nama", formData.nama);
    form.append("judul", formData.judul);
    form.append("biaya", formData.biaya);
    form.append("jpl", formData.jpl);
    form.append("vendor", formData.vendor);
    form.append("noVendor", formData.noVendor);

    // Append files if they exist
    if (files.fotoPelatihan) form.append("foto_pelatihan", files.fotoPelatihan);
    if (files.fotoStruk) form.append("foto_struk", files.fotoStruk);
    if (files.fotoMateri) form.append("foto_materi", files.fotoMateri);
    if (files.fotoSertifikat)
      form.append("foto_sertifikat", files.fotoSertifikat);

    const response = await axios.post(
      `${baseUrl}/api/learning-wallet/user/${username}`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error submitting learning wallet:", error);
    throw error;
  }
};

export const submitRKAPLearningWallet = async (
  file: File | null
): Promise<void> => {
  if (!file) {
    throw new Error("Silakan pilih file terlebih dahulu!");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result as string;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Parse Excel ke JSON
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

        // Transform data
        const transformedData: RKAPData[] = jsonData.map((item) => ({
          username: item.NIKSAP,
          nama: item.Nama,
          biaya_rkap_lw: item["RKAP Biaya Learning Wallet"],
          rkap_jpl: item["RKAP Jam Pembelajaran Learning Wallet"],
          rkap_tahun: item["Rkap Tahun"],
        }));

        // Kirim data ke API
        const response = await axios.post(
          `${baseUrl}/api/learning-wallet/admin/rkaplw`,
          transformedData,
          { withCredentials: true }
        );

        if (response.status === 200 || response.status === 201) {
          await Swal.fire({
            title: "Success!",
            text: "Berhasil Menambahkan Anggaran",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.replace("/learning-wallet/rkap-learning-walletport");
          resolve();
        } else {
          reject(new Error("Gagal mengirim data ke API."));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Gagal membaca file."));
    };

    reader.readAsBinaryString(file);
  });
};

export const downloadTemplateRKAPLW = () => {
  window.open(`${baseUrl}/api/learning-wallet/download-template`, "_blank");
};

export const getAllRealisasiLWAdmin = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/learning-wallet/admin`, {
      withCredentials: true,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const getAllRealisasiLWUser = async (username: number | string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/learning-wallet/user/${username}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRealisasiLWUserByLWId = async (id: number) => {
  try {
    let message;
    const result = await axios.delete(
      `${baseUrl}/api/learning-wallet/user/lw/${id}`,
      {
        validateStatus: () => true, // handle manual response
        withCredentials: true,
      }
    );

    if (result.status === 200) {
      message = "Learning Wallet berhasil dihapus";
    } else if (result.status === 404) {
      message = "Learning Wallet Tidak Ditemukan";
    } else {
      message = "An unexpected error occurred. Please try again.";
    }
    return message;
  } catch (error) {
    throw error;
  }
};

export const updateStatusRealisasiLWUserByLWId = async (
  status: string,
  niksap: string | number,
  lwId: number
) => {
  try {
    await axios.put(
      `${baseUrl}/api/learning-wallet/admin/update-status/${niksap}`,
      {
        status: status,
        learningWalletId: lwId,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const EditRealisasiLearningWallet = async (
  formData: FormData,
  files: {
    fotoPelatihan: File | null;
    fotoStruk: File | null;
    fotoMateri: File | null;
    fotoSertifikat: File | null;
  },
  username: number | string,
  lwId: number
) => {
  try {
    const form = new FormData();

    // Append text data
    form.append("nama", formData.nama);
    form.append("judul", formData.judul);
    form.append("biaya", formData.biaya);
    form.append("jpl", formData.jpl);
    form.append("vendor", formData.vendor);
    form.append("noVendor", formData.noVendor);

    // Append files if they exist
    if (files.fotoPelatihan) form.append("foto_pelatihan", files.fotoPelatihan);
    if (files.fotoStruk) form.append("foto_struk", files.fotoStruk);
    if (files.fotoMateri) form.append("foto_materi", files.fotoMateri);
    if (files.fotoSertifikat)
      form.append("foto_sertifikat", files.fotoSertifikat);

    const response = await axios.put(
      `${baseUrl}/api/learning-wallet/user/${username}/lw/${lwId}`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error submitting learning wallet:", error);
    throw error;
  }
};

export const detailRealisasiLWUserByLWId = async (lwId: number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/learning-wallet/user/lw/${lwId}`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRKAPLW = async () => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/learning-wallet/admin/rkaplw`,
      {
        withCredentials: true,
      }
    );
    return result.data.data;
  } catch (error) {
    throw error;
  }
};

export const detailRKAPLWById = async (lwId: number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/learning-wallet/admin/rkaplw/${lwId}`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteRKAPLWById = async (lwId: number) => {
  try {
    const result = await axios.delete(
      `${baseUrl}/api/learning-wallet/admin/rkaplw/${lwId}`,
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
