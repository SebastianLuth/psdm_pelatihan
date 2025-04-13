import {  EvaluatorData } from "@/types/manajement-users-type";

type TableListBawahanProps = {
    allBawahan : EvaluatorData[];
    onDeleteBawahan : (user_id : number, evaluator_id : number) => void
}



export function TableListBawahan({allBawahan, onDeleteBawahan}: TableListBawahanProps) {
  return (
    <>
    <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left">
      <thead>
        <tr className="bg-gray-100 text-sm text-gray-700">
          <th className="px-4 py-3">No</th>
          <th className="px-4 py-3">NIK-SAP</th>
          <th className="px-4 py-3">Nama</th>
          <th className="px-4 py-3">Kategori</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {allBawahan.map((evaluator, index) => (
          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 text-center">{index + 1}</td>
            <td className="cursor-pointer px-4 py-3 text-center text-blue-600 hover:underline">
              {evaluator.evaluator_username}
            </td>
            <td className="px-4 py-3">{evaluator.evaluator_name}</td>
            <td className="px-4 py-3">{evaluator.evaluator_category}</td>
            <td className="px-4 py-3 text-center">
              <button
                className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                onClick={() => onDeleteBawahan(evaluator.user_id, evaluator.evaluator_id )}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
    <span>Showing 1 to 4 of 4 entries</span>
    <div className="space-x-2">
      <button className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300">
        Previous
      </button>
      <button className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300">
        Next
      </button>
    </div>
  </div>
  </>
  );
}
