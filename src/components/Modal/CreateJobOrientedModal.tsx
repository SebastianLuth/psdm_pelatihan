type CreateJobOrientedModalProps = {
  onClose: () => void;
  onAddJobOriented: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  fileName: string;
  file: File | null;
};

export const CreateJobOrientedModal = ({
  onClose,
  onAddJobOriented,
  onFileChange,
  onRemoveFile,
  fileName,
  file,
}: CreateJobOrientedModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Masukkan File PDF Laporan anda
          </h2>

          <div className="mb-4">
            <div className="mt-5 flex w-full items-center justify-center">
              <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF Only</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={onFileChange}
                  accept="application/pdf"
                />
              </label>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-3 shadow-sm">
                <span className="text-sm font-medium text-indigo-700">
                  {fileName}
                </span>
                <button
                  onClick={onRemoveFile}
                  className="rounded-full p-1 text-red-500 hover:bg-red-100"
                >
                  <svg
                    className="h-5 w-5"
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
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={onAddJobOriented}
              disabled={!file}
              className={`rounded-md px-4 py-2 text-white ${
                file ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
