import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type skmbtType = {
  nama: string;
  niksap: string;
  jabatan: string;
};

export const getAllDataWasiatKarpelAdmin = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/skmbt/admin`, {
      withCredentials: true,
    });
    return result.data.data || [];
  } catch (error) {
    Swal.fire(
      "Gagal!",
      "Terjadi kesalahan saat mengambil data SKMBT.",
      "error"
    );
    throw error;
  }
};

export const getAllDataWasiatKarpelSuperAdmin = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/skmbt/super-admin`, {
      withCredentials: true,
    });
    return result.data.data || [];
  } catch (error) {
    Swal.fire(
      "Gagal!",
      "Terjadi kesalahan saat mengambil data SKMBT.",
      "error"
    );
    throw error;
  }
};

export const getDetailDataWasiatKarpelById = async (skmbtId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/skmbt/admin/${skmbtId}`, {
      withCredentials: true,
    });
    const data = response.data.data[0];
    return data;
  } catch (error) {
    throw error;
  }
};

export const addWasiatKarpel = async (
  formData: skmbtType,
  files: {
    pdf_skmbt: File | null;
  }
) => {
  try {
    const form = new FormData();

    form.append("nama", formData.nama);
    form.append("niksap", formData.niksap);
    form.append("jabatan", formData.jabatan);

    if (files.pdf_skmbt) form.append("pdf_skmbt", files.pdf_skmbt);

    const result = await axios.post(`${baseUrl}/api/skmbt/admin`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.replace("/skmbt/karpel");
      });
    }
  } catch (error) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: "Terjadi kesalahan saat Mengrimkan File.",
    // }).then(() => {
    //     window.location.reload();
    // })
    throw error;
  }
};

export const editWasiatKarpel = async (
  formData: skmbtType,
  files: {
    pdf_skmbt: File | null;
  },
  skmbtId: number
) => {
  try {
    const form = new FormData();

    form.append("nama", formData.nama);
    form.append("niksap", formData.niksap);
    form.append("jabatan", formData.jabatan);

    if (files.pdf_skmbt) form.append("pdf_skmbt", files.pdf_skmbt);

    const result = await axios.put(
      `${baseUrl}/api/skmbt/admin/${skmbtId}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.replace("/skmbt/karpel");
      });
    }
  } catch (error) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: "Terjadi kesalahan saat Mengrimkan File.",
    // }).then(() => {
    //     window.location.reload();
    // })
    throw error;
  }
};

export const deleteWasiatKarpelById = async (skmbtId: number) => {
  try {
    const result = await axios.delete(`${baseUrl}/api/skmbt/admin/${skmbtId}`, {
      withCredentials: true,
    });

    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getAllDataWasiatKarpimAdmin = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/skmbt/karpim/admin`, {
      withCredentials: true,
    });

    return result.data.data || [];
  } catch (error) {
    Swal.fire(
      "Gagal!",
      "Terjadi kesalahan saat mengambil data SKMBT.",
      "error"
    );
    throw error;
  }
};

export const getAllDataWasiatKarpimSuperAdmin = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/skmbt/karpim/super-admin`, {
      withCredentials: true,
    });
    console.log(result);
    return result.data.data || [];
  } catch (error) {
    Swal.fire(
      "Gagal!",
      "Terjadi kesalahan saat mengambil data SKMBT.",
      "error"
    );
    throw error;
  }
};

export const addWasiatKarpim = async (
  formData: skmbtType,
  files: {
    pdf_skmbt: File | null;
    pdf_skmbt2: File | null;
  }
) => {
  try {
    const form = new FormData();

    form.append("nama", formData.nama);
    form.append("niksap", formData.niksap);
    form.append("jabatan", formData.jabatan);

    if (files.pdf_skmbt) form.append("pdf_skmbt", files.pdf_skmbt);
    if (files.pdf_skmbt2) form.append("pdf_skmbt2", files.pdf_skmbt2);

    const result = await axios.post(`${baseUrl}/api/skmbt/karpim/admin`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.replace("/skmbt/karpim");
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi kesalahan saat Mengrimkan File.",
      confirmButtonText: "Oke",
    }).then(() => {
      window.location.reload();
    });
    throw error;
  }
};

export const getDetailDataWasiatKarpimById = async (skmbtId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/skmbt/karpim/admin/${skmbtId}`,
      {
        withCredentials: true,
      }
    );
    const data = response.data.data[0];
    return data;
  } catch (error) {
    throw error;
  }
};

export const editWasiatKarpim = async (
  formData: skmbtType,
  files: {
    pdf_skmbt: File | null;
    pdf_skmbt2: File | null;
  },
  skmbtId: number
) => {
  try {
    const form = new FormData();

    form.append("nama", formData.nama);
    form.append("niksap", formData.niksap);
    form.append("jabatan", formData.jabatan);

    if (files.pdf_skmbt) form.append("pdf_skmbt", files.pdf_skmbt);
    if (files.pdf_skmbt2) form.append("pdf_skmbt2", files.pdf_skmbt2);

    const result = await axios.put(
      `${baseUrl}/api/skmbt/karpim/admin/${skmbtId}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.replace("/skmbt/karpim");
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi kesalahan saat Mengrimkan File.",
      confirmButtonText: "Oke",
    }).then(() => {
      window.location.reload();
    });
    throw error;
  }
};

export const deleteDataWasiatKarpimById = async (skmbtId: number) => {
  try {
    const result = await axios.delete(
      `${baseUrl}/api/skmbt/karpim/admin/${skmbtId}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200 || result.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
        confirmButtonText: "Oke",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    throw error;
  }
};
