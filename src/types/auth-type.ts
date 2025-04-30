
export type UserData = {
    id: number;
    username: number | string;
    nama: string;
    nomor_hp: string;
    unit_kerja: string;
    unit_kerja_id  : number;
    jabatan: string;
    level: number;
    role: string;
    biaya_pelatihan_user: number;
    foto_profil: string;
    token : string;
    refresh_token: string;
    company_id: number;
    company_name: string;

  };
  
  export type AuthContextType = {
    userData: UserData | null;
    setUserData: (userData: UserData | null) => void;
    login: (username: number | undefined, password: string) => void;
    logout: () => void;
    errorMessage: string | null;
    isError: boolean;
    isLoading: boolean;
  };