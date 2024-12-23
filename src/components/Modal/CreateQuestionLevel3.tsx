import { ChangeEvent, SetStateAction } from "react";

type QuestionTypeLevel3Form = {
    setOpen : React.Dispatch<SetStateAction<boolean>>;
    handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent) => void; 
    formData: {
        kategori: string;
        pertanyaan: string;
    }
};

const CreateQuestionLevel3 = ({setOpen, handleInputChange, handleSubmit, formData} : QuestionTypeLevel3Form) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-200 bg-opacity-50  antialiased backdrop-blur-sm">
      <div className="mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
        {/* Header */}
        <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
          <p className="font-semibold text-gray-800">Tambahkan Pertanyaan</p>
          <button onClick={() => setOpen(false)}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form className="mx-auto w-full bg-white p-10" onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Kategori
          </label>
          <select
            onChange={handleInputChange}
            name="kategori"
            value={formData.kategori}
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Pilih Kategori</option>
            <option value="teknis">Teknis</option>
            <option value="non teknis">Non Teknis</option>
            <option value="personality">Personality</option>
            <option value="leadership">Leadership</option>
          </select>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Pertanyaan
          </label>
          <input
            type="text"
            placeholder="Type message..."
            name="pertanyaan"
            value={formData.pertanyaan}
            onChange={handleInputChange}
            className="mb-5 h-18 w-full rounded border border-gray-200 bg-white p-5 shadow-sm"
          ></input>

          <div className="flex flex-row items-center justify-end rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
            <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestionLevel3;
