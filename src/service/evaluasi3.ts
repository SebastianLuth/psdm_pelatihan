import { TrainingEvaluasi3Summary, UserTrainingEvaluation3 } from "@/types/evaluasi3";
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

export const fetchAllTrainingsWithEvaluatedCountlv3 = async () => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation3`,
      {
        withCredentials: true,
      }

    );
    const data = result.data.data
    const formattedData = data.map((training: TrainingEvaluasi3Summary) => ({
      ...training,
      start_date: format(new Date(training.start_date), "dd MMMM yyyy"),
      end_date: format(new Date(training.end_date), "dd MMMM yyyy"),
    }));
    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const getUsersEvaluatedByEvaluator = async () =>{
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation3`,
      {
        withCredentials: true,
      }

    );
     const formattedData = result.data.data.map((training : UserTrainingEvaluation3) => ({
       ...training,
       tgl_mulai_pelatihan: format(new Date(training.tgl_mulai_pelatihan), "dd MMMM yyyy"),
       tgl_selesai_pelatihan: format(new Date(training.tgl_selesai_pelatihan), "dd MMMM yyyy"),
     }))

    return formattedData
  } catch (error) {
    throw error
  }
}

export const getDetailAllEvaluatorAndUserEvaluastion3 = async (trainingId: number) => {
  try {
    const result = await axios.get(
      `${baseUrl}/api/evaluation3/evaluasi/${trainingId}`,
      {
        withCredentials: true
      }
    )

    const data = result.data.data;

    return data

  } catch (error) {
    throw error;
  }
}

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