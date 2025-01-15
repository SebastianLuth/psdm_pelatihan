import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteQuestionLevel1 = async (id: number) => {
  try {
    await axios.delete(`${baseUrl}/api/evaluation/question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getQuestionLevel1 = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/evaluation/question`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailQuestionLevel1 = async (id: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation/question/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addQuestionLevel1 = async (pertanyaan: string, kategori: string ) => {
  try {
    await axios.post(`${baseUrl}/api/evaluation/question`, {
      question: pertanyaan,
      category: kategori,
    });
  } catch (error) {
    throw error;
  }
};

export const updateQuestionLevel1 = async (id: number, pertanyaan: string, kategori: string) => {
  try {
    await axios.put(`${baseUrl}/api/evaluation/question/${id}`, {
      question: pertanyaan,
      category: kategori
    });
  } catch (error) {
    throw error;
  }
};

export const getQuestionLevel3 = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/evaluation3/question`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addQuestionLevel3 = async (
  pertanyaan: string,
  kategori: string
) => {
  try {
    await axios.post(`${baseUrl}/api/evaluation3/question`, {
      pertanyaan: pertanyaan,
      kategori: kategori,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteQuestionLevel3 = async (id: number) => {
  try {
    await axios.delete(`${baseUrl}/api/evaluation3/question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getDetailQuestionLevel3 = async (id: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/evaluation3/question/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestionLevel3 = async (
  id: number,
  pertanyaan: string,
  kategori: string
) => {
  try {
    await axios.put(`${baseUrl}/api/evaluation3/question/${id}`, {
      pertanyaan: pertanyaan,
      kategori: kategori,
    });
  } catch (error) {
    throw error;
  }
};

