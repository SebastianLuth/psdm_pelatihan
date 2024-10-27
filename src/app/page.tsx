import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dynamic from "next/dynamic";
import ScrollableCards from "@/components/CardScrollers";
import Calendar from "@/components/Calender";

export const metadata = {
  title: "PTPN4 | Dashboard PSDM Pelatihan",
  description: "Dashboard PSDM Pelatihan",
};
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

export default function Home() {
  return (
    
    <>
    
      <DefaultLayout>
        <div className="mb-4 block">
          <ScrollableCards />
        </div>
        <Calendar/>
      </DefaultLayout>
    </>
  );
}
