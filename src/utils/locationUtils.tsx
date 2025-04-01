"use client";

import { toast } from "react-toastify";

export const handleUseCurrentLocation = async (): Promise<any> => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      console.log("Location Data:", data);
      return data;
    } catch (error) {
      console.error("Geolocation error or failed to fetch location data:", error);
      toast.error(
        "Geolocation error or failed to fetch location data. Please enter your location details manually."
      );
      throw error;
    }
  } else {
    toast.error("Geolocation is not supported by this browser. Please enter your location details manually.");
    throw new Error("Geolocation not supported");
  }
};