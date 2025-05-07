import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getDataCKLUserByNIKSAP = async (niksap : string | number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/ckp/user/ckl/${niksap}`,
      {
        withCredentials: true,
      }
    );
    return result.data.data || [];
  } catch (error) {
    Swal.fire({
      title: "Data CKP Gagal Diambil",
    });
    throw error;
  }
};


