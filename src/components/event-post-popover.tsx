import React from "react";
import moment from "moment";
import { Event } from "@/types/dashboar-tipe";

interface EventPostPopoverProps {
  newEvent: Partial<Event>;
  onChange: (event: Partial<Event>) => void;
  onSave: () => void;
  onClose: () => void;
  isUploaded: boolean;
}

export default function EventPostPopover({
  newEvent,
  onChange,
  onSave,
  onClose,
  isUploaded,
}: EventPostPopoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Tambahkan Event Baru</h3>
        <input
          type="text"
          placeholder="Judul Event"
          value={newEvent.title || ""}
          onChange={(e) =>
            onChange({ ...newEvent, title: e.target.value })
          }
          className="mb-4 w-full rounded border border-gray-300 p-2"
        />
        <textarea
          placeholder="Deskripsi"
          value={newEvent.description || ""}
          onChange={(e) =>
            onChange({ ...newEvent, description: e.target.value })
          }
          className="mb-4 w-full rounded border border-gray-300 p-2"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Mulai
          </label>
          <input
            type="text"
            value={
              newEvent.start
                ? moment(newEvent.start).format("YYYY-MM-DD HH:mm")
                : ""
            }
            readOnly
            className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Akhir
          </label>
          <input
            type="text"
            value={
              newEvent.end
                ? moment(newEvent.end).format("YYYY-MM-DD HH:mm")
                : ""
            }
            readOnly
            className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-600"
          />
        </div>
        <div className="flex justify-between space-x-2">
          {isUploaded ? (
            <div>
              <p className="mb-4 text-lg font-semibold text-green-500 ">
                Event berhasil ditambahkan
              </p>
              <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
                Close
              </button>
            </div>
          ) : (
            <>
              <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
                Cancel
              </button>
              <button onClick={onSave} className="rounded bg-blue-600 px-4 py-2 text-white">
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
