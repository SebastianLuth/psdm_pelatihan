type CreateJobOrientedModalProps = {
  onClose: () => void;
};

export const CreateProjectAssignmentModal = ({
  onClose,
}: CreateJobOrientedModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop dengan efek blur */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {/* Konten modal Anda di sini */}
          <h2 className="text-xl font-semibold text-gray-800">
            Masukkan File PDF Laporan anda
          </h2>

          <div className="mb-4">
            {/* Area Unggah File */}
            <div className="mt-5 flex w-full items-center justify-center">
              <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
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
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF Only
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  //   onChange={handleFileChange}
                  accept="application/pdf"
                />
              </label>
            </div>

            {/* Menampilkan Nama File dan Tombol "X" */}
            {/* {fileName && (
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-3 shadow-sm">
                      <span className="text-sm font-medium text-indigo-700">
                        {fileName}
                      </span>
                      <button
                        onClick={handleRemoveFile}
                        className="rounded-full p-1 text-red-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-700"
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
                  )} */}
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={() => console.log("Aksi disini")}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
