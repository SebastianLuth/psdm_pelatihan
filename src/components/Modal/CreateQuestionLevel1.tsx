import { ChangeEvent, SetStateAction } from "react";

type QuestionTypeLevel1 = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  submitQuestion: () => void;
};
const CreateQuestionLevel1 = ({
  setOpen,
  handleInputChange,
  submitQuestion,
}: QuestionTypeLevel1) => {
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
        <div className="flex flex-col bg-gray-50 px-6 py-5">
          <p className="mb-2 font-semibold text-gray-700">Pertanyaan</p>
          <input
            type="text"
            placeholder="Type message..."
            onChange={handleInputChange}
            className="mb-5 h-36 rounded border border-gray-200 bg-white p-5 shadow-sm"
          ></input>
        </div>
        {/* Footer */}
        <div className="flex flex-row items-center justify-end rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
          <button
            onClick={submitQuestion}
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionLevel1;
