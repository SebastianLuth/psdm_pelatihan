export interface vendorType {
    id?: number;
    nama: string;
    alamat_lembaga: string;
    layanan_utama: string;
    telpon_lembaga: string;
    email_lembaga: string;
    website_lembaga: string;
    pic_lembaga: string;
    company_id?: number;
    npwp ?: string;
  }


export interface CompanyType {
    id: number;
    nama: string;
    alamat : string;
    nomor_hp : string;
    email : string;
    created_at : string;
    update_at : string;
}


export interface downloadType {
  startDate: string;
  endDate: string;
  company_id?: number | string;
}