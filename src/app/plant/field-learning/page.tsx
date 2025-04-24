'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FieldLearningPage = () => {
  const [activeCycle, setActiveCycle] = useState<number | null>(null);

  const toggleCycle = (cycleNumber: number) => {
    setActiveCycle(activeCycle === cycleNumber ? null : cycleNumber);
  };

  const cycles = [
    {
      id: 1,
      name: "FL Siklus 1",
      weeks: [
        {
          name : "Minggu 1",
          url : "/plant/field-learning/siklus1/week1"
        },
        {
          name : "Minggu 2",
          url : "/plant/field-learning/siklus1/week1"
        },
        {
          name : "Minggu 3",
          url : "/plant/field-learning/siklus1/week1"
        },
        {
          name : "Minggu 4",
          url : "/plant/field-learning/siklus1/week1"
        },
        {
          name : "Presentasi",
          url : "/plant/field-learning/siklus1/presentation"
        },
      ],
    },
    {
      id: 2,
      name: "FL Siklus 2",
      weeks: [
        {
          name : "Minggu 1",
          url : "/plant/field-learning/siklus2/week1"
        },
        {
          name : "Minggu 2",
          url : "/plant/field-learning/siklus2/week1"
        },
        {
          name : "Minggu 3",
          url : "/plant/field-learning/siklus2/week1"
        },
        {
          name : "Minggu 4",
          url : "/plant/field-learning/siklus2/week1"
        },
        {
          name : "Presentasi",
          url : "/plant/field-learning/siklus2/presentation"
        },
      ],
    },
  ];

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Field Learning
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap field learning, Segera isi
            semua nya
          </p>

          {/* Field Learning Menu */}
          <div className="space-y-4 p-4">
            {cycles.map((cycle) => (
              <div
                key={cycle.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  onClick={() => toggleCycle(cycle.id)}
                  className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                >
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {cycle.name}
                  </h3>
                  {activeCycle === cycle.id ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeCycle === cycle.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-5 dark:border-gray-700">
                    <ul className="space-y-3">
                      {cycle.weeks.map((week, index) => (
                        <li key={index}>
                          <a
                            href= {week.url}
                            className={`flex items-center rounded-lg p-3 transition-colors ${
                              index === cycle.weeks.length - 1
                                ? "bg-green-50 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50"
                                : "bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
                            }`}
                          >
                            <span
                              className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                                index === cycle.weeks.length - 1
                                  ? "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span className="font-medium">{week.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FieldLearningPage;