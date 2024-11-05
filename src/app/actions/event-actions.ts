import axios from "axios";

export async function createEvent(formData: FormData): Promise<{ error: string } | { success: boolean }> {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dateStart = formData.get("dateStart") as string;
    const dateEnd = formData.get("dateEnd") as string;

    await axios.post("http://localhost:5000/api/calendar", {
      title,
      description,
      dateStart,
      dateEnd,
    }, {
      withCredentials: true,
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create event" };
  }
}
