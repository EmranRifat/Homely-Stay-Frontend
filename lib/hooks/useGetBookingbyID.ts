"use client";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { MyBookingResponse } from "../types";




const fetchMyBookings = async (): Promise<MyBookingResponse> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "http://192.168.1.71:8080";


  const token = Cookies.get("token");


  if (!token) {
    throw new Error("Login token is required");
  }


  const response = await fetch(
    `${baseUrl}/api/my-bookings`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );


  const result: MyBookingResponse = await response.json();


  if (!response.ok || result.status !== "success") {
    throw new Error(
      result.message || "Failed to fetch bookings"
    );
  }


  return result;
};



export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: fetchMyBookings,
    placeholderData: (previousData) => previousData,
  });
};