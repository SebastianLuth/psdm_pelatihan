"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps extends ReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxWords?: number; // Tambahkan prop untuk batas kata
  maxChars?: number; // Tambahkan prop untuk batas karakter
}

const QuillEditor = ({
  value,
  onChange,
  placeholder,
  maxWords,
  maxChars,
  ...props
}: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  const handleChange = (content: string) => {
    // Hitung jumlah kata dan karakter
    const text = content.replace(/<[^>]*>/g, " "); // Hilangkan tag HTML
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const chars = text.length;

    setWordCount(words.length);
    setCharCount(chars);

    // Cek batasan
    const wordLimitExceeded = maxWords ? words.length > maxWords : false;
    const charLimitExceeded = maxChars ? chars > maxChars : false;
    const limitExceeded = wordLimitExceeded || charLimitExceeded;

    setIsOverLimit(limitExceeded);

    // Jika belum melebihi batas, lanjutkan perubahan
    if (!limitExceeded) {
      onChange(content);
    }
  };

  // Modul dan toolbar konfigurasi
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <div className="w-full space-y-2">
      <div
        className={`rounded-lg border ${isOverLimit ? "border-red-500" : "border-gray-300"} overflow-hidden`}
      >
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder || "Tulis sesuatu..."}
          className={`rounded-lg bg-white ${isOverLimit ? "border border-red-500 p-2 " : ""}`}
          {...props}
        />
      </div>

       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        {maxWords && (
          <span className={wordCount > maxWords ? 'text-red-500 font-medium' : ''}>
            Kata: {wordCount}/{maxWords}
          </span>
        )}
        {maxChars && (
          <span className={charCount > maxChars ? 'text-red-500 font-medium' : ''}>
            Karakter: {charCount}/{maxChars}
          </span>
        )}
      </div>
      
      {isOverLimit && (
        <div className="text-red-500 text-sm font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Anda telah melebihi batas maksimum!</span>
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
