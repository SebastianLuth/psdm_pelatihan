import { User } from "@/types/manajement-users-type";

type CreateBawahanModalProps = {
  dataAllUserByUnitKerja: User[];
  onClose: () => void;
  onAddBawahan: (username: number, nama: string) => void;
  success?: boolean;
  error?: string | null | undefined;
};

export default function CreateBawahanModal({
  dataAllUserByUnitKerja,
  onClose,
  onAddBawahan,
  success,
  error,
}: CreateBawahanModalProps) {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center mt-2 mb-2"  onClick={handleOverlayClick}>
        {/* Kontainer untuk menjaga modal tetap di tengah dan scrollable */}
        <div className="relative max-h-full w-full overflow-y-auto sm:max-w-sm md:max-w-md lg:max-w-3xl">
          <div className="relative flex flex-col rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-5">
              <h3 className="text-xl font-bold">Tambah Bawahan</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            {/* Body */}
            <div className="p-6">
              <div className="relative overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-4 py-2">Nama Karyawan</th>
                      <th className="px-4 py-2">NIKSAP</th>
                      <th className="px-4 py-2">Unit Kerja</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAllUserByUnitKerja.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.nama}</td>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.unit_kerja}</td>
                        <td className="px-4 py-2">
                          <button
                            className="rounded bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
                            onClick={() => onAddBawahan(user.username, user.nama)}
                          >
                            Tambah
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {success && (
                  <p className="mt-4 text-sm text-green-500">
                    Bawahan berhasil ditambahkan.
                  </p>
                )}
                {error && (
                  <p className="mt-4 text-sm text-red-500">{error}</p>
                )}
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end border-t p-4">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
