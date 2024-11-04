import HeaderCalendar from "@/components/HeaderCalendar/Header";
import MainView from "@/components/MainView";
import { CalendarEventType } from "@/lib/store";
import axios from "axios";
import dayjs from "dayjs";

const getEventsData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/calendar");

    if (!response) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = response.data;
    console.log("ini data event dari pages/calendar",data);

    return data.map((event : any) => ({
      ...event,
      dateStart: dayjs(event.date_start).toISOString(),
      dateEnd: dayjs(event.date_end).toISOString(),
    }));
  } catch (error) { 
    console.error("Error fetching data from the API:", error);
    return [];
  }
};  

export default async function Calendar() {
  const dbEvents = await getEventsData(); 

  return (
    <div className="bg-white p-8">
      <HeaderCalendar />
      <MainView eventsData={dbEvents as CalendarEventType[]} />
    </div>    
  );
}
