import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  countryId: string;
  regionId: string;
  setLocation: (countryId: string, regionId: string) => void;
}

export const useLocationStore = create(
  persist<LocationState>(
    (set) => ({
      countryId: "",
      regionId: "",
      setLocation: (countryId, regionId) => set({ countryId, regionId }),
    }),
    { name: "location-storage" }
  )
);
