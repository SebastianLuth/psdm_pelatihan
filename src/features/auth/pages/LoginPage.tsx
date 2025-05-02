"use client";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { SectionContainer } from "@/components/Layouts/SectionCointainer";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";


const LoginPage = (): JSX.Element => {
  const [formData, setFormData] = useState<{
    username: number | null;
    password: string;
  }>({
    username: null,
    password: "",
  });
  const { login, errorMessage, isLoading } = useAuth();
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
    [],
  );

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { username, password } = formData;
      if (username !== null) {
        login(username, password);
      }
    },
    [formData, login],
  );

  useEffect(() => {
    setIsError(!!errorMessage);
  }, [errorMessage]);

  return (
    <>
      <div className="relative min-h-screen w-screen flex items-center justify-center">
        <Image
          src="/images/bg-login.png"
          alt="background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <SectionContainer
          padded
          className="flex h-full w-full items-center justify-center"
        >
          <div className="p-10 w-full max-w-[640px] bg-white shadow rounded-lg items-center mx-auto">
            <div className="flex flex-col items-center justify-center">
              <Image
                width={240}
                height={120}
                src="/images/logo/palapa.webp"
                alt="logo ptpn4"
              />
            </div>
            <div className="space-y-2 p-3 sm:p-4 md:space-y-4 mt-4">
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    NIKSAP
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
                  className="led:cursor-not-allowed flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
                >
                  {isLoading ? <ButtonLoading /> : "Masuk"}
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-center text-xs text-gray-600 sm:block ">
                <span>
                  PALAPA © {new Date().getFullYear()} PT Perkebunan Nusantara
                  IV - DPSB{" "}
                </span>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </>
  );
};

export default LoginPage;
