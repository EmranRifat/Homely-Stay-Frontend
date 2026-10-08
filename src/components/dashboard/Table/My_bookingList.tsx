"use client";

import { useMyBookings } from "@/lib/hooks/useGetBookingbyID";
import { useState } from "react";
import BookingDetailsModal from "../../modal/BookingDetailsModal";
import { useAuth } from "@/lib/auth-context";
const formatDate = (value?: string) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getPaymentBadge = (method?: string) => {
  if (method?.toLowerCase() === "manual") {
    return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";
  }

  return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
};

const getStatusBadge = (status?: string) => {
  const value = status?.toLowerCase();

  if (value === "confirmed") {
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  }

  if (value === "pending") {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  }

  if (value === "cancelled") {
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  }

  return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
};

export default function MyBookingList() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useMyBookings();

  const bookings = data?.data ?? [];

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (booking: any) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div
        className="flex min-h-48 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-slate-700 dark:text-gray-300"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-pink-500 dark:border-gray-500 dark:border-t-pink-400"
          aria-hidden="true"
        />
        <span>Loading bookings...</span>
      </div>
    );
  }

  if (isError) {
    return <div className="p-5 text-red-500">Failed to load bookings</div>;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-slate-700">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No booking found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-900 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  #
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Check In
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Check Out
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Guests
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Payment
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Total
                </th>

                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  onClick={() => handleOpen(item)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {item.product_image ? (
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs dark:bg-slate-700">
                          N/A
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.product_title}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.product_address}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 capitalize text-gray-700 dark:text-gray-300">
                    {item.category}
                  </td>

                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {formatDate(item.check_in)}
                  </td>

                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {formatDate(item.check_out)}
                  </td>

                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {item.adults} Adult
                    {item.children > 0 && `, ${item.children} Child`}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getPaymentBadge(item.payment_method)}
                      `}
                    >
                      {item.payment_method || "-"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusBadge(item.status)}
                      `}
                    >
                      {item.status || "confirmed"}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                    {Number(item.total_amount || 0).toLocaleString()}{" "}
                    {item.currency}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatDate(item.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BookingDetailsModal
        booking={selectedBooking}
        user={user}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
