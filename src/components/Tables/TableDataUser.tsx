import Image from "next/image";
import { Product } from "@/types/product";

const productData: Product[] = [
  {
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    name: "Macbook Pro M1",
    category: "Electronics",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    name: "Dell Inspiron 15",
    category: "Electronics",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    name: "HP Probook 450",
    category: "Electronics",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableDataUser = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="text-xl font-semibold text-black dark:text-white">
        Data User
      </h4>
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

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">No</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">NIKSAP</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nama</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Jabatan</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>
      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md"></div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableDataUser;
