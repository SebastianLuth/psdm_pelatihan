import { FreeTextEvaluationForAdmin } from "@/types/freetext-type";
import { TrainingEvaluatedCountType } from "@/types/training-types";
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
    console.log("ini hasil nya ", result.data)
    return result.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDataCountEvaluatedFreeTextForAdmin = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/evaluation/all-freetext-summary`, {
      withCredentials: true,
    });

    const formattedData = response.data.data.map((training: TrainingEvaluatedCountType) => ({
      ...training,
      start_date: format(new Date(training.start_date), "dd MMMM yyyy"),
      end_date: format(new Date(training.end_date), "dd MMMM yyyy"),
    }));

    return formattedData;
  } catch (error) {
    throw error;
  }
}


// Perbaikan untuk nanti kalo udah di klik pelatihan free text maka mengambil data orang orang di pelatihan tersebut
export const getDetailDataFreeTextTraining = async (pelatihanId : number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation/all-freetext/${pelatihanId}`,
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

export const getDetailDataFreeTextUser = async( training_id: number, user_id: number) => {
  
    try {
        const result = await axios.get(
            `${baseUrl}/api/evaluation/freetext/${training_id}/${user_id}`,
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