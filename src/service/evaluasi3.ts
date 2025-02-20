import { UserTrainingEvaluation3 } from "@/types/evaluasi3";
import axios from "axios";
import { format } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getQuestions3 = async (trainingId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation3/question/start/${trainingId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const submitAnswerEvaluation3 = async (
  trainingId: number,
  userId: number,
  answers: any
) => {
  try {
    const answerArray = Object.entries(answers).map(([id, jawaban]) => ({
      pertanyaan_id: Number(id),
      jawaban,
    }));
    await axios.post(
      `${baseUrl}/api/evaluation3/question/submit/${trainingId}/${userId}`,
      { answers: answerArray },
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (error) {
    throw error;
  }
};

export const getAllUserAndTheirTrainingsEvaluation3 = async (
): Promise<UserTrainingEvaluation3[] | undefined> => {
  try {
  

    const result = await axios.get(
      `${baseUrl}/api/evaluation3`,
      {
        withCredentials: true,
      }

    );
    const data = result.data.data
    const formattedData = data.map((training: UserTrainingEvaluation3) => ({
      id : training.id,
      evaluator_id: training.evaluator_id,
      evaluator_name: training.evaluator_name,
      evaluator_niksap: training.evaluator_niksap,
      evaluator_jabatan: training.evaluator_jabatan,
      pelatihan_id: training.pelatihan_id,
      judul_pelatihan: training.judul_pelatihan,
      RKAP_type_pelatihan: training.RKAP_type_pelatihan,
      metode_pelatihan: training.metode_pelatihan,
      lembaga_pelatihan: training.lembaga_pelatihan,
      lokasi_pelatihan: training.lokasi_pelatihan,
      tgl_mulai_pelatihan: format(new Date(training.tgl_mulai_pelatihan), "dd MMMM yyyy"),
      tgl_selesai_pelatihan: format(new Date(training.tgl_selesai_pelatihan), "dd MMMM yyyy"),
      user_id: training.user_id,
      nama_peserta: training.nama_peserta,
      niksap_peserta: training.niksap_peserta,
      jabatan_peserta: training.jabatan_peserta,
      nomor_hp_peserta: training.nomor_hp_peserta,
      unit_kerja_peserta: training.unit_kerja_peserta
    }));
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getAllEvaluationData = async (
  training_id: number,
  participan_id: number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation3/evaluasi/${training_id}/${participan_id}`
    );
    console.log("ini response datanya",response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getStatusEvaluation3 = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/evaluation3/status_evaluasi3`,{
      withCredentials: true
    });
    return result.data.data;
  } catch (error) {
    throw error;
  }
}

export const DownloadExcelEvaluation3 = async (
  startDate: string,
  endDate: string
) => {
  try {
    const response =await axios.get(
      `http://localhost:5000/api/evaluation3/export?startDate=${startDate}&endDate=${endDate}`, 
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



export const DownloadExcelEvaluation3otherRegional = async (
  startDate: string,
  endDate: string,
  company_id: number
) => {
  try {
    const response =await axios.get(
      `http://localhost:5000/api/evaluation3/super-admin/export?startDate=${startDate}&endDate=${endDate}&company_id=${company_id}`, 
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