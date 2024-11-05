import React from 'react';
import moment from 'moment';

interface Event {
  start: Date;
  end: Date;
  title: string;
  description?: string;
}

interface EventSummaryPopoverProps {
  event: Event;
  onClose: () => void;
}

export default function EventSummaryPopover({ event, onClose }: EventSummaryPopoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Deskripsi:</strong> {event.description || 'Tidak ada deskripsi'}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Tanggal Mulai:</strong> {moment(event.start).format('YYYY-MM-DD HH:mm')}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Tanggal Akhir:</strong> {moment(event.end).format('YYYY-MM-DD HH:mm')}
        </p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
      </div>
    </div>
  );
}
