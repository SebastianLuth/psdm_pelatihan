"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import QuillEditor from "@/components/QuillEditor";
import { Building, Dumbbell, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProjectAssigmentPage = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const MAX_WORDS = 1000;
  const MAX_CHARS = 10000;

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    // You can do additional things with the content here if needed
    console.log(content); // For debugging
  };

  const handleSubmit = () => {
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

    // Proses penyimpanan
    console.log("Menyimpan:", {
      content: editorContent,
      wordCount: words.length,
      charCount: chars,
    });

    // Di sini Anda bisa menambahkan API call untuk menyimpan data
    alert("Project assignment berhasil disimpan!");
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Project Assignment
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap field
            learning, Segera isi semua nya
          </p>
          {/* Next Content */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Lightbulb />
                </div>
                <p className="text-sm font-medium text-gray-800">Ide Inovasi</p>
              </div>
              <Link href={"/plant/project-assignment/ide-inovasi"} className="text-sm font-semibold text-blue-500">
                Kerjakan
              </Link>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Building />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Implementasi Inovasi
                </p>
              </div>
              <Link href={"/plant/project-assignment/implementasi"} className="text-sm font-semibold text-blue-500">
                Kerjakan
              </Link>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default ProjectAssigmentPage;
