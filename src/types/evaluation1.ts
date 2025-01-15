export interface QuestionEvaluation1 {
  id: number;
  pertanyaan: string;
  kategori: string;
}

export interface EvaluationItem {
  user_id: number;
  name: string;
  username: number;
  phone_number: string;
  unit_kerja: number;
  jabatan: string;
  training_id: number;
  training_title: string;
  question_id: number;
  question_text: string;
  answer: string | null;
  evaluation_question_text?: string | null;
}
