export type UserTrainingEvaluation3 = {
  id: string;
  judul: string;
  nama: string;
  jenis: string;
  tgl_mulai: string;
  tgl_selesai: string;
  lembaga: string;
  hasCompletedEvaluation: boolean;
  participanId: string;
};

export interface Pertanyaan3 {
  question_id: number;
  question_text: string;
  question_category: string;
  answer: string;
  evaluation_question_text: string;
}

export interface EvaluationDataLevel3 {
  user_id: number;
  name: string;
  username: string;
  phone_number: string;
  unit_kerja: number;
  jabatan: string;
  pelatihan_id: number;
  pelatihan_title: string;
  pertanyaan: Pertanyaan3[];
}
