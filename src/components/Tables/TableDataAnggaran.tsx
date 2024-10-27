"use client";
import { BRAND } from "@/types/brand";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
];

const TableDataAnggaran = () => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Data Anggaran
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Halaman ini untuk melihat data Anggaran.
        </p>

        <div className="flex items-center justify-between py-4">
          {/* Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Show</span>
            <select className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Search:</span>
            <input
              type="text"
              className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex flex-col">
          {/* Header Table */}
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-6">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                No
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jenis Anggaran
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Anggaran Terpakai
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Sisa Anggaran
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Tahun Anggaran
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {/* Data Rows */}
          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-6 ${
                key === brandData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.visitors}K</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.name}</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.name}</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.name}</p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.name}</p>
              </div>
              <div className="flex items-center justify-start gap-4 p-2.5 xl:p-5">
                <button className="text-black dark:text-white">Edit</button>
                <button className="text-black dark:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableDataAnggaran;
