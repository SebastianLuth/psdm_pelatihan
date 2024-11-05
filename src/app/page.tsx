import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ScrollableCards from "@/components/CardScrollers";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyCalendar from "@/app/calendar/page";

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
        <MyCalendar /> 
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}
