export interface ParticipantType {
  user_id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: string;
  jabatan: string;
  level: number;
}

export interface TrainingType {
  id?: number;
  judul: string;
  jenis: string;
  metode: string;
  lokasi: string;
  lembaga: string;
  kompetensi: string;
  jumlah_anggaran: number;
  rkap_type: string;
  jumlah_peserta: number;
  tgl_mulai: string;
  tgl_selesai: string;
  peserta: ParticipantType[];
}


export interface PelatihanResponseType {
  pelatihan_id: number;
  judul_pelatihan?: string;
  jenis_anggaran_pelatihan: string;
  metode_pelatihan: string;
  lokasi_pelatihan?: string;
  anggaran_pelatihan: number;
  jumlah_peserta_pelatihan: number;
  tanggal_mulai_pelatihan: string;
  lembaga_pelatihan : string;
  kompetensi_pelatihan : string;
  rkap_type_pelatihan : string;
  tanggal_selesai_pelatihan: string;
}
