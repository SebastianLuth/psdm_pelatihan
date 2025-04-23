'use client';

import { useMemo, useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps extends ReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillEditor = ({ value, onChange, placeholder, ...props }: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  
  // Modul dan toolbar konfigurasi
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align'
  ];

  return (
    <div className="w-full">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Tulis sesuatu...'}
        className="bg-white rounded-lg"
        {...props}
      />
    </div>
  );
};

export default QuillEditor;