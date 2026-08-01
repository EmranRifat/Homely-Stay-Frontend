"use client";

import Image from "next/image";

interface Props {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const formatDate = (value?: string) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default function BookingDetailsModal({
  booking,
  isOpen,
  onClose,
  user,
}: Props) {
  if (!isOpen || !booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-slate-600"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Booking Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Booking ID #{booking.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-xl text-gray-500 transition hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Top Section */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Property */}
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                🏠 Property
              </h3>

              {booking.product_image && (
                <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl">
                  <img
                    src={booking.product_image}
                    alt={booking.product_title || "Property"}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <b>Name:</b> {booking.product_title || "-"}
                </p>

                <p>
                  <b>Category:</b> {booking.category || "-"}
                </p>

                <p>
                  <b>Address:</b> {booking.product_address || "-"}
                </p>
              </div>
            </div>

            {/* User */}
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                👤 User Information
              </h3>

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <b>Name:</b> {user?.name || "-"}
                </p>

                <p>
                  <b>Email:</b> {user?.email || "-"}
                </p>

                <p>
                  <b>User ID:</b> {user?.id || "-"}
                </p>

                <p>
                  <b>Role:</b> {user?.role || "User"}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              📅 Booking Information
            </h3>

            <div className="grid gap-y-3 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2">
              <p>
                <b>Status:</b> {booking.status || "-"}
              </p>

              <p>
                <b>Payment:</b> {booking.payment_method || "-"}
              </p>

              <p>
                <b>Check In:</b> {formatDate(booking.check_in)}
              </p>

              <p>
                <b>Check Out:</b> {formatDate(booking.check_out)}
              </p>

              <p>
                <b>Guests:</b> {booking.adults || 0} Adult
                {booking.children > 0 && `, ${booking.children} Child`}
              </p>

              <p>
                <b>Total:</b>{" "}
                {Number(booking.total_amount || 0).toLocaleString()}{" "}
                {booking.currency || "BDT"}
              </p>
            </div>
          </div>

          {/* Special Request */}
          {booking.special_request && (
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                💬 Special Request
              </h3>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                {booking.special_request}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
