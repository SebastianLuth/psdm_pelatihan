import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dynamic from "next/dynamic";
import CardDataStats from "@/components/CardDataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import TableOne from "@/components/Tables/TableOne";
import ChatCard from "@/components/Chat/ChatCard";
import ScrollableCards from "@/components/CardScrollers";

export const metadata: Metadata = {
  title: "PTPN4 | Dashboard PSDM Pelatihan ",
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
        <div className="mt-4 flex flex-wrap gap-10">
          <ChartOne />
          <ChartTwo />
          <MapOne />
          <div className="col-span-12 xl:col-span-8">
            <TableOne />
          </div>
          <ChatCard />
        </div>
      </DefaultLayout>
    </>
  );
}
