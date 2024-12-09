export interface Event {
    id?: number;
    start: Date;
    end: Date;
    title: string;
    description?: string;
    color?: string;
  }
  
 export const colorsBarCalendar = [
    "#FF5733", 
  "#33FF57", 
  "#3357FF",
  "#FF33A8", 
  "#FF8F33", 
  "#8D33FF", 
  "#33FFF3", 
  "#FF3333", 
  "#33FF8F", 
  "#3380FF",
  ];