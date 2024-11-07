import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getEventDataCalendar = async () => {
   try {
    const response = await axios.get(`${baseUrl}/api/calendar`, {
        withCredentials: true,
    });
    console.log("ini response get Event1", response.data);
    const mappedResponse = response.data.map((event: any) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.date_start),
      end: new Date(event.date_end),
      description : event.description
    }))
    console.log("ini response get Event2", mappedResponse);
    return mappedResponse
   } catch (error) {
    console.error("Error fetching events:", error);
    return [];
   }
};

export const postEvent = async (eventData: {
    title: string;
    description?: string;
    dateStart: string;
    dateEnd: string;
  }) => {
    try {
      await axios.post(`${baseUrl}/api/calendar`, eventData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error posting event:", error);
    }
};

export const deleteEvent = async (eventId: number) => {
  try {
    await axios.delete(`${baseUrl}/api/calendar/${eventId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}