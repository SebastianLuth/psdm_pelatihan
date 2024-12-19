'use client'
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import ButtonLoading from "../buttons/ButtonLoading";

import dynamic from "next/dynamic";
const ParticlesJsBackground = dynamic(() => import('@/components/ParticlesJsBackground'), { ssr: false });

const LoginPageLayout = (): JSX.Element => {
    const [formData, setFormData] = useState<{ username: number | null; password: string }>({
        username: null,
        password: "",
    });    const { login, errorMessage, isLoading } = useAuth();
    const [isError, setIsError] = useState(false);

  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      window.location.href = "/";
    }
  }, [userData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "username" ? Number(value) || null : value,
        }));
    },
    []
);
  

const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = formData;
        if (username !== null) {
            login(username, password);
        }
    },
    [formData, login]
);

  useEffect(() => {
    setIsError(!!errorMessage);
  }, [errorMessage]);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gray-50">
        <Image
          src="/assets/bg-website2.webp"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="relative z-50 w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="mt-10 flex justify-center text-2xl font-semibold text-gray-900 ">
              <Image
                width={70}
                height={70}
                src="/assets/logoptpn4.png"
                alt="logo ptpn4"
              />
            </div>
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Selamat Datang di N4TALENT
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username ?? ""}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-green-600 focus:ring-green-600 sm:text-sm "
                    placeholder="Masukkan NIKSAP Contoh 4002142"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan Password"
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-green-600 focus:ring-green-600 sm:text-sm "
                  />
                </div>

                {isError && errorMessage && (
                  <div className="flex items-center justify-center">
                    <div className="flex w-full items-center justify-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
                      <AiOutlineWarning className="mr-2 h-5 w-5 text-red-500" />
                      {errorMessage}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!formData.username || !formData.password}
                  className="led:cursor-not-allowed flex w-full justify-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
                >
                  {isLoading ? <ButtonLoading /> : "Masuk"}
                </button>
              </form>
            </div>
            <div className="mb-6">
              <div className="flex flex-col text-center text-sm text-gray-600 sm:block ">
                <span>
                  N4TALENT © {new Date().getFullYear()} PT Perkebunan Nusantara IV -
                  SDM{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <ParticlesJsBackground />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPageLayout;