
export type UserData = {
    id: number;
    username: number;
    nama: string;
    nomor_hp: string;
    unit_kerja: string;
    jabatan: string;
    level: number;
    role: string;
    biaya_pelatihan_user: number;
    foto_profil: string;
    token : string;
    refresh_token: string;
  };
  
  export type AuthContextType = {
    userData: UserData | null;
    setUserData: (userData: UserData | null) => void;
    login: (username: number, password: string) => void;
    logout: () => void;
    errorMessage: string | null;
    isError: boolean;
    isLoading: boolean;
  };