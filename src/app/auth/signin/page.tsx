import LoginPageLayout from "@/components/Layouts/LoginPage";
export const metadata = {
  title: "PALAPA | Login",
  description: "Masuk ke akun Anda di PALAPA (PALMCO After Learning Application) untuk mengakses pelatihan, evaluasi, dan materi pembelajaran terbaru. Didesain untuk memudahkan proses belajar dan pengembangan karyawan.",
  keywords: [
    "PALAPA login",
    "PALMCO After Learning Application",
    "login pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "e-learning PALMCO",
    "sistem pelatihan PALMCO",
  ],
  author : "PTPN 4 PALMCO",
  robots: "index, follow",
};

const SignIn = (): JSX.Element => {
  return (
    <>
      <LoginPageLayout/>
    </>
  )
};
export default SignIn;
