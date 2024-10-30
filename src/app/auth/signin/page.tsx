'use client';
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { AiOutlineWarning } from "react-icons/ai";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { useAuth } from "@/context/AuthContext";

const SignIn = (): JSX.Element => {
  const [username, setUsername] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const { login, errorMessage, isLoading } = useAuth();
  const [isError, setIsError] = useState(false);

  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      window.location.href = "/";
    }
  }, [userData]);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (errorMessage) {
      setIsError(true);
    }
  }, [errorMessage]);

  return (
    <>
      <Head>
        <title>EV4- Login</title>
      </Head>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="relative z-50 w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="flex justify-center mt-10 text-2xl font-semibold text-gray-900 ">
              <Image
                width={70}
                height={70}
                src="/assets/logoptpn4.png"
                alt="logo ptpn4"
              />
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
                Selamat Datang di PSDM PELATIHAN 
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(event) => setUsername(Number(event.target.value))}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 "
                    placeholder="Masukkan Username"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan Password"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 "
                  />
                </div>

                {isError && (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-800 bg-red-100 rounded-md">
                      <AiOutlineWarning className="w-5 h-5 mr-2 text-red-500" />
                      {errorMessage}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!username || !password}
                  className="flex justify-center led:cursor-not-allowed w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  {isLoading ? <ButtonLoading /> : "Masuk"}
                </button>
              </form>
            </div>
            <div className="mb-6">
              <div className="flex flex-col text-sm text-center text-gray-600 sm:block ">
                <span>
                  EV4 © {new Date().getFullYear()} PT Perkebunan Nusantara IV -
                  SDM{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10">
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;