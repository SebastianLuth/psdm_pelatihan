import { FreeTextEvaluationForAdmin } from "@/types/freetext-type";
import axios from "axios";
import { format } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getAllDataFreeTextTrainingbyUser = async () => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation/freetext`,
      {
        withCredentials: true,
      }
    );
    return result.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDataFreeTextTrainingByAdmin = async () => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation/all-freetext`,
      {
        withCredentials: true,
      }
    );
    const formattedData = result.data.data.map(
      (item: FreeTextEvaluationForAdmin) => ({
        ...item,
        tgl_mulai_pelatihan: format(
          new Date(item.tgl_mulai_pelatihan),
          "dd MMMM yyyy"
        ),
        tgl_selesai_pelatihan: format(
          new Date(item.tgl_selesai_pelatihan),
          "dd MMMM yyyy"
        ),
      })
    );

    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getDetailDataFreeTextUser = async(user_id: number, training_id: number) => {
    try {
        const result = await axios.get(
            `${baseUrl}/api/evaluation/freetext/${user_id}/${training_id}`,
            {
              withCredentials: true,
            },
          );
          const data = result.data.data[0] || {};
          return data
    } catch (error) {
        throw error
    }
}

export const submitFreeTextEvaluation = async (trainingId: number, konseptualiasasi_pembelajaran: string, rencana_tindak_lanjut : string, narasumber : string) => {
    try { 
         await axios.post(`${baseUrl}/api/evaluation/freetext/start/${trainingId}`, {
                konseptualiasasi_pembelajaran : konseptualiasasi_pembelajaran,
                rencana_tindak_lanjut : rencana_tindak_lanjut,
                narasumber : narasumber,
              }, {
                withCredentials: true
              })
    } catch (error) {
        throw error;
    }
}