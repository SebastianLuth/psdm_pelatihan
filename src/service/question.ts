import axios from "axios";

export const deleteQuestionLevel1 = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5000/api/evaluation/question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getQuestionLevel1 = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/evaluation/question`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailQuestionLevel1 = async (id: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/evaluation/question/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addQuestionLevel1 = async (pertanyaan: string) => {
  try {
    await axios.post(`http://localhost:5000/api/evaluation/question`, {
      pertanyaan,
    });
  } catch (error) {
    throw error;
  }
};

export const updateQuestionLevel1 = async (id: number, pertanyaan: string) => {
  try {
    await axios.put(`http://localhost:5000/api/evaluation/question/${id}`, {
      pertanyaan: pertanyaan,
    });
  } catch (error) {
    throw error;
  }
};

export const getQuestionLevel3 = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/evaluation3/question`
    );
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
    await axios.post(`http://localhost:5000/api/evaluation3/question`, {
      pertanyaan: pertanyaan,
      kategori: kategori,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteQuestionLevel3 = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5000/api/evaluation3/question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getDetailQuestionLevel3 = async (id: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/evaluation3/question/${id}`
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
    await axios.put(`http://localhost:5000/api/evaluation3/question/${id}`, {
      pertanyaan: pertanyaan,
      kategori: kategori,
    });
  } catch (error) {
    throw error;
  }
};
