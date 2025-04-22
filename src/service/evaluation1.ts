import { EvaluationItem } from "@/types/evaluation1";
import { TrainingEvaluatedCountType, TrainingType, UserTraining } from "@/types/training-types";
import axios from "axios";
import { format } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllQuestionEvaluation1 = async (trainingId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation/start/${trainingId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Gagal mendapatkan pertanyaan");
  }
};

export const submitAnswerEvaluation1 = async (
  trainingId: number,
  answers: any
) => {
  try {
    const answerArray = Object.entries(answers).map(([id, jawaban]) => ({
      pertanyaan_id: Number(id),
      jawaban,
    }));
    await axios.post(
      `${baseUrl}/api/evaluation/submit/${trainingId}`,
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

export const getAllTrainingEvaluation1 = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/training`, {
      withCredentials: true,
    });
    const formattedData = response.data.data.map((training: TrainingType) => ({
      ...training,
      tgl_mulai: format(new Date(training.tgl_mulai), "dd MMMM yyyy"),
      tgl_selesai: format(new Date(training.tgl_selesai), "dd MMMM yyyy"),
    }));
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getAllTrainingsWithEvaluatedCount = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/evaluation`, {
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

export const getAllUserAndTheirTrainings = async (
  pelatihanId : number
) => {
  try {
    const response = await axios.get(`${baseUrl}/api/evaluation/${pelatihanId}`, {
      withCredentials: true,
    });

    const formattedData = response.data.data.map((training: UserTraining) => ({
      ...training,
      start_date: format(new Date(training.start_date), "dd MMMM yyyy"),
      end_date: format(new Date(training.end_date), "dd MMMM yyyy"),
    }));

    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getEvaluationData = async (userId: number, trainingId: number) => {
  try {
    const response = await axios.get<{ data: EvaluationItem[] }>(
      `${baseUrl}/api/evaluation/${userId}/${trainingId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const DownloadExcelEvaluation1 = async (
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation/export?startDate=${startDate}&endDate=${endDate}`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DownloadExcelEvaluation1OtherRegional = async (
  startDate: string,
  endDate: string,
  company_id: number
) => {
  try {
    const response =await axios.get(
      `${baseUrl}/api/evaluation/super-admin/export?startDate=${startDate}&endDate=${endDate}&company_id=${company_id}`, 
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
