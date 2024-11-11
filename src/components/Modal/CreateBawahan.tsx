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
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-3xl font-semibold">Tambah Bawahan</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-6 py-3">Nama Karyawan</th>
                      <th className="px-6 py-3">NIKSAP</th>
                      <th className="px-6 py-3">Unit Kerja</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAllUserByUnitKerja.map((user) => (
                      <tr
                        className="border-b bg-white hover:bg-gray-50"
                        key={user.id}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                          {user.nama}
                        </th>
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user.unit_kerja}</td>
                        <td className="px-6 py-4">
                          <button
                            className="rounded bg-emerald-500 px-6 py-3 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
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
                  <p className="mt-2 p-4 text-green-500">
                    Bawahan berhasil ditambahkan.
                  </p>
                )}
                {error && <p className="mt-2 p-4 text-red-500">{error}</p>}
              </div>
            </div>
            {/* Footer */}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
