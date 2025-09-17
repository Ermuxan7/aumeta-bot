// components/RegionSelect.tsx
"use client";
import { ControllerRenderProps } from "react-hook-form";
import { useRegions } from "@/hooks/useCountries";
import { useLocationStore } from "@/store/locationStore";

type Props = {
  field: ControllerRenderProps<any, "region_id">;
};

export default function RegionSelect({ field }: Props) {
  const { countryId, setLocation } = useLocationStore();
  const { data: regions = [] } = useRegions(countryId ?? 0);

  return (
    <select
      {...field}
      onChange={(e) => {
        field.onChange(e);
        setLocation(Number(countryId), Number(e.target.value));
      }}
      className="border rounded px-2 py-1 w-full"
    >
      {regions.map((r: any) => (
        <option key={r.id} value={r.id}>
          {r.name}
        </option>
      ))}
    </select>
  );
}
