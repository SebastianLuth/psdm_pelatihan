"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import QuillEditor from "@/components/Layouts/QuillEditor";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const KepemimpinanCKLPage = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const MAX_WORDS = 1000;
  const MAX_CHARS = 6000;

  const { userData } = useAuth();
  const router = useRouter();

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    // You can do additional things with the content here if needed
    console.log(content); // For debugging
  };

  const handleSubmit = async () => {
    // Validasi sebelum submit
    const text = editorContent.replace(/<[^>]*>/g, " ");
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const chars = text.length;

    if (words.length > MAX_WORDS || chars > MAX_CHARS) {
      alert("Konten melebihi batas maksimum!");
      return;
    }

    await axios.put(
      `${baseUrl}/api/ckp/user/ckl-kepemimpinan`,
      {
        ckl_kepemimpinan: editorContent,
        niksap: userData?.username,
        wordCount: words.length,
        charCount: chars,
      },
      {
        withCredentials: true,
      },
    );

    // Di sini Anda bisa menambahkan API call untuk menyimpan data
    Swal.fire({
      title: "Success!",
      text: "Berhasil menambahkan Jawaban.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      router.push("/plant/corp-knowledge");
    });
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <>
          <div className="mb-8 flex justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Isi CKL Kepemimpinan Anda
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Lengkapi form berikut untuk menambahkan CKL Kepemimpinan terhadap
                Corporate Knowledge Learning anda
              </p>
            </div>
            <Breadcrumb />
          </div>
          <div className="w-full rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <QuillEditor
              value={editorContent}
              onChange={handleEditorChange}
              placeholder="Tulis deskripsi CKL Kepemimpinan Anda di sini..."
              maxWords={MAX_WORDS}
              maxChars={MAX_CHARS}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!editorContent.trim() || editorContent.length > MAX_CHARS}
            >
              Simpan
            </button>
          </div>

        </>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default KepemimpinanCKLPage;
