export type UserTrainingEvaluation3 = {
  id : number,
  evaluator_id: number,
  evaluator_name: string,
  evaluator_niksap: number,
  evaluator_jabatan: string,
  pelatihan_id: 35,
  judul_pelatihan: string,
  RKAP_type_pelatihan: string,
  metode_pelatihan: string,
  lembaga_pelatihan: string,
  lokasi_pelatihan: string,
  tgl_mulai_pelatihan: string,
  tgl_selesai_pelatihan: string,
  user_id: number,
  nama_peserta: string,
  niksap_peserta: number,
  jabatan_peserta: string,
  nomor_hp_peserta: string,
  unit_kerja_peserta: string
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
