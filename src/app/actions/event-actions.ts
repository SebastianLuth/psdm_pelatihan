import axios from "axios";

export async function createEvent(formData: FormData): Promise<{ error: string } | { success: boolean }> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;

  if (!title || !description || !date || !time) {
    return { error: 'All fields are required' };
  }
  const dateTime = `${date}T${time}:00`;

  try {
    // Send data to your Express API
    await axios.post("http://localhost:5000/api/calendar", 
      {
      title,
      description,
      dateStart: dateTime,
      dateEnd: dateTime,
      },
      {
        withCredentials: true,
      }
    );

    return { success: true };
  } catch (error) {
    return { error: "Failed to create event" };
  }
}