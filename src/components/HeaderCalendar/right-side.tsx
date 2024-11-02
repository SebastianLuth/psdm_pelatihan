"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/select";
import { useViewStore } from "@/lib/store";

export default function HeaderRight() {

  const { setView } = useViewStore();

  return (
    <div className="flex items-center space-x-4 z-200">
    {/* <SearchComponent /> */}
    <Select onValueChange={(v) => setView(v)}>
      <SelectTrigger className="w-24 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month" className="z-20">Month</SelectItem>
        <SelectItem value="week" className="z-20">Week</SelectItem>
        <SelectItem value="day" className="z-20">Day</SelectItem>
      </SelectContent>
    </Select>
  </div>
  )
}
