'use client'

import { useState, useRef, useEffect } from 'react'
import { ButtonCalendar } from "@/app/ui/button"
import { ScrollArea } from "@/app/ui/scroll-area"
import { ChevronDown } from "lucide-react"

export default function AddTime({
  onTimeSelect,
}: {
  onTimeSelect: (time: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('00:00')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const generateTimeIntervals = () => {
    const intervals = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        intervals.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        )
      }
    }
    return intervals
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onTimeSelect(time);
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <ButtonCalendar
        variant="outline"
        className="w-24 justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTime}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </ButtonCalendar>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-24 rounded-md border bg-popover text-popover-foreground shadow-md">
          <ScrollArea className="h-60">
            <div className="p-1">
              {generateTimeIntervals().map((time) => (
                <ButtonCalendar
                  key={time}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </ButtonCalendar>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}