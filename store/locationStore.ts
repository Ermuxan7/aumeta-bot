import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  countryId: number | null;
  regionId: number | null;
  setLocation: (countryId: number, regionId: number) => void;
}

export const useLocationStore = create(
  persist<LocationState>(
    (set) => ({
      countryId: null,
      regionId: null,
      setLocation: (countryId, regionId) => set({ countryId, regionId }),
    }),
    { name: "location-storage" }
  )
);
