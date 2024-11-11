import { BawahanUser } from "@/types/manajement-users-type";

type TableListBawahanProps = {
    allBawahan : BawahanUser[];
    onDeleteBawahan : (bawahan_username : number) => void
}

export function TableListBawahan({allBawahan, onDeleteBawahan}: TableListBawahanProps) {
  return (
    <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left">
      <thead>
        <tr className="bg-gray-100 text-sm text-gray-700">
          <th className="px-4 py-3">No</th>
          <th className="px-4 py-3">NIK-SAP</th>
          <th className="px-4 py-3">Nama</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {allBawahan.map((bawahan, index) => (
          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 text-center">{index + 1}</td>
            <td className="cursor-pointer px-4 py-3 text-center text-blue-600 hover:underline">
              {bawahan.bawahan_username}
            </td>
            <td className="px-4 py-3">{bawahan.nama}</td>
            <td className="px-4 py-3 text-center">
              <button
                className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                onClick={() => onDeleteBawahan(bawahan.bawahan_username)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
