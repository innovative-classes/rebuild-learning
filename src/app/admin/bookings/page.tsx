"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const res = await fetch("/api/admin/bookings");
    if (res.ok) {
      const data = await res.json();
      setBookings(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadBookings();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    PENDING_PAYMENT: "bg-orange-50 text-orange-700",
    PENDING: "bg-yellow-50 text-yellow-700",
    CONFIRMED: "bg-blue-50 text-blue-700",
    COMPLETED: "bg-green-50 text-green-700",
    CANCELLED: "bg-red-50 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-green-900">Bookings</h1>
        <span className="text-sm text-green-600/60">{bookings.length} total</span>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 && (
          <div className="bg-white rounded-xl border border-green-200/50 p-8 text-center shadow-sm">
            <p className="text-sm text-green-500/50">No bookings yet</p>
          </div>
        )}

        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-green-200/50 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-green-900">{b.name}</h3>
                <p className="text-xs text-green-500/50">{b.email} • {b.phone}</p>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] || "bg-green-50 text-green-600"}`}>
                {b.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-green-600/60">Date: </span>
                <span className="text-green-900">{b.preferredDate}</span>
              </div>
              <div>
                <span className="text-green-600/60">Time: </span>
                <span className="text-green-900">{b.preferredTime}</span>
              </div>
            </div>

            {b.message && (
              <p className="text-sm text-green-700 bg-green-50/50 rounded-lg p-3 mb-3">
                {b.message}
              </p>
            )}

            <div className="flex gap-2">
              {b.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(b.id, "CONFIRMED")}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, "CANCELLED")}
                    className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
              {b.status === "CONFIRMED" && (
                <button
                  onClick={() => updateStatus(b.id, "COMPLETED")}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
