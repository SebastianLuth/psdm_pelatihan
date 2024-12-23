import { UserTrainingEvaluation3 } from "@/types/evaluasi3";
import { unitKerjaList } from "@/types/manajement-users-type";
import axios from "axios";
import { format } from "date-fns";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getUnitKerjaIdByName = (name: string): number | undefined => {
  const unit = unitKerjaList.find((unit) => unit.name === name);
  return unit?.id; // Mengembalikan undefined jika tidak ditemukan
};

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
  participantId: number,
  answers: any
) => {
  try {
    const answerArray = Object.entries(answers).map(([id, jawaban]) => ({
      pertanyaan_id: Number(id),
      jawaban,
    }));
    await axios.post(
      `${baseUrl}/api/evaluation3/question/submit/${trainingId}/${participantId}`,
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
  unit_kerja: string
): Promise<UserTrainingEvaluation3[] | undefined> => {
  try {
    const unitKerjaId = getUnitKerjaIdByName(unit_kerja || "");
    if (!unitKerjaId) {
      return undefined;
    }

    const result = await axios.get(
      `${baseUrl}/api/evaluation3?unit_kerja=${unitKerjaId}`
    );

    // Hapus duplikat berdasarkan kombinasi user_id dan training_id
    const uniqueData = Array.from(
      new Map(
        result.data.data.map((item: any) => [
          `${item.user_id}-${item.training_id}`,
          item,
        ])
      ).values()
    );

    const formattedData = uniqueData.map((training: any) => ({
      id: training.training_id,
      judul: training.training_title,
      nama: training.name,
      jenis: training.training_type,
      tgl_mulai: format(new Date(training.start_date), "dd MMMM yyyy"),
      tgl_selesai: format(new Date(training.end_date), "dd MMMM yyyy"),
      lembaga: training.training_location,
      hasCompletedEvaluation: training.has_completed_evaluation,
      participanId: training.user_id,
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
      `${baseUrl}/api/evaluation3/${training_id}/${participan_id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
