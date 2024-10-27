import DefaultLayout from "@/components/Layouts/DefaultLayout";

const addDepartment = () => {
    return(
        <DefaultLayout>
            <div className="p-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form>
                <div>
                <label className="mb-1 block font-medium text-gray-600">
                  Nama Unit Kerja
                </label>
                <input
                  type="text"
                  placeholder="Contoh : Staff Sub Bagian Persona"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
                />
              </div>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-7">Simpan</button>
                </form>
            </div>
        </DefaultLayout>
    )

};

export default addDepartment;