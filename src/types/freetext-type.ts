export interface FreeTextEvaluation {
    id: number;
    user_id: number;
    pelatihan_id: number;
    konseptualiasasi_pembelajaran: string;
    rencana_tindak_lanjut: string;
    narasumber: string;
    is_completed: boolean | number;
}

export interface freetextData {
  konseptualiasasi_pembelajaran : string;
  rencana_tindak_lanjut : string;
  narasumber : string;
}

export interface FreeTextEvaluationForAdmin {
    pelatihan_id: number;
    judul_pelatihan: string;
    metode_pelatihan: string;
    lembaga_pelatihan: string;
    lokasi_pelatihan: string;
    anggaran_pelatihan: string;
    kompetensi_pelatihan: string;
    rkap_type_pelatihan: string;
    jenis_pelatihan: string;
    tgl_mulai_pelatihan: string;
    tgl_selesai_pelatihan: string;
    jam_pelajaran_pelatihan: number;
    user_id: number;
    niksap_peserta: number;
    nama_peserta: string;
    unit_kerja_peserta  : string;
    jabatan_peserta: string;
    level_peserta: number;
    konseptualiasasi_pembelajaran: string;
    rencana_tindak_lanjut: string;
    narasumber: string;
  }
