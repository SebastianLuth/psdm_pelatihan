"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import SelectUnitKerja from "@/components/SelectGroup/SelectUnitKerja";
import TableDataUser from "@/components/Tables/TableDataUser";
import { useState } from "react";

const UsersDataPage = () => {
  const [selectedUnitKerja, setSelectedUnitKerja] = useState<string>("");
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <div className="m-10">
          <SelectUnitKerja onUnitKerjaChange={setSelectedUnitKerja} />
        </div>
        <div className="m-10">
          <TableDataUser selectedUnitKerja={selectedUnitKerja} />
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default UsersDataPage;
