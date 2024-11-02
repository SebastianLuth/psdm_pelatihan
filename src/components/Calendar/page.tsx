import HeaderCalendar from "@/components/HeaderCalendar/Header";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MainView from "@/components/MainView";
import { db } from "@/db/drizzle";
import { CalendarEventType } from "@/lib/store";
import dayjs from "dayjs";

const getEventsData = async () => {
  try {
    const data = await db.query.eventsTable.findMany();

    // Convert the Dayjs object to a simple ISO string
    return data.map((event) => ({
      ...event,
      date: dayjs(event.date).toISOString(), // Convert Dayjs to string
    }));
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  }
};

export default async function Calendar() {
  const dbEvents =  getEventsData();

  return (
    <div className="bg-white p-8">
      <HeaderCalendar />
      <MainView eventsData={dbEvents as unknown as CalendarEventType[]} />
    </div>    
  );
}
