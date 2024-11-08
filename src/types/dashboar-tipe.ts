export interface Event {
    id?: number;
    start: Date;
    end: Date;
    title: string;
    description?: string;
    color?: string;
  }
  
 export const colorsBarCalendar = [
    "bg-blue-400",
    "bg-green-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];