import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dynamic from "next/dynamic";
import ScrollableCards from "@/components/CardScrollers";
import ProtectedRoute from "@/components/ProtectedRoute";
import Calendar from "@/app/calendar/page";

export const metadata = {
  title: "PTPN4 | Dashboard PSDM Pelatihan",
  description: "Dashboard PSDM Pelatihan",
};

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <div className="mb-4 block">
            <ScrollableCards />
          </div>
          <Calendar />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}
