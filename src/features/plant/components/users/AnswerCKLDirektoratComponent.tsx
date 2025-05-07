"use client";
import { useAuth } from "@/context/AuthContext";
import QuillEditor from "@/features/plant/components/QuillEditor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const AnswerDirektoratCKLComponent = () => {
  const [editorContents, setEditorContents] = useState({
    direktorat1: "",
    direktorat2: "",
    direktorat3: "",
    direktorat4: "",
    direktorat5: "",
    direktorat6: "",
    direktorat7: "",
  });  

  const MAX_WORDS = 1000;
  const MAX_CHARS = 6000;

  const { userData } = useAuth();
  const router = useRouter()

  const handleEditorChange = (field : keyof typeof editorContents   ,content: string) => {
    setEditorContents((prevContents) => ({
      ...prevContents,
      [field]: content
    }))
    console.log(`${field} content:`, content); // For debugging
  };

  const handleSubmit = async () => {
    // Validasi sebelum submit
    for (const [key, content] of Object.entries(editorContents)) {
      const text = content.replace(/<[^>]*>/g, " ");
      const words = text
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);
      const chars = text.length;

      if (words.length > MAX_WORDS || chars > MAX_CHARS) {
        Swal.fire("Error!", `Konten ${key} melebihi batas maksimum!`, "error");
        return;
      }
    }
    try {
      await axios.put(
        `${baseUrl}/api/ckp/user/ckl-direktorat`,
        {
          ckl_direktorat: editorContents.direktorat1,
          ckl_direktorat2: editorContents.direktorat2,
          ckl_direktorat3: editorContents.direktorat3,
          ckl_direktorat4: editorContents.direktorat4,
          ckl_direktorat5: editorContents.direktorat5,
          ckl_direktorat6: editorContents.direktorat6,
          ckl_direktorat7: editorContents.direktorat7,
          niksap: userData?.username,
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

    } catch (error) {
      Swal.fire("Error!", "Gagal menyimpan data.", "error");
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <div className="mb-8 flex justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Isi CKL Direktorat Anda
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Lengkapi form berikut untuk menambahkan CKL Direktorat terhadap
            Corporate Knowledge Learning anda
          </p>
        </div>
      </div>

      {/* Direktorat 1 */}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 1</p>
        <QuillEditor
          value={editorContents.direktorat1}
          onChange={(content) => handleEditorChange('direktorat1', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 2 */}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 2</p>
        <QuillEditor
          value={editorContents.direktorat2}
          onChange={(content) => handleEditorChange('direktorat2', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 3 */}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 3</p>
        <QuillEditor
          value={editorContents.direktorat3}
          onChange={(content) => handleEditorChange('direktorat3', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 4*/}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 4</p>
        <QuillEditor
          value={editorContents.direktorat4}
          onChange={(content) => handleEditorChange('direktorat4', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 5*/}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 5</p>
        <QuillEditor
          value={editorContents.direktorat5}
          onChange={(content) => handleEditorChange('direktorat5', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 6 */}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 6</p>
        <QuillEditor
          value={editorContents.direktorat6}
          onChange={(content) => handleEditorChange('direktorat6', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      {/* Direktorat 7*/}
      <div className="w-full flex flex-col rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <p className="p-4">Direktorat 7</p>
        <QuillEditor
          value={editorContents.direktorat7}
          onChange={(content) => handleEditorChange('direktorat7', content)}
          placeholder="Tulis deskripsi CKL BintalfisdisPage Anda di sini..."
          maxWords={MAX_WORDS}
          maxChars={MAX_CHARS}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!Object.values(editorContents).some(content => content.trim())}
        >
          Simpan
        </button>
      </div>
    </>
  );
};

export default AnswerDirektoratCKLComponent;
