"use client";
import { ControllerRenderProps } from "react-hook-form";
import { useRegions } from "@/hooks/useCountries";
import { useLocationStore } from "@/store/locationStore";
import FormInput from "@/app/components/form-input/FormInput";

type Props = {
  field: ControllerRenderProps<any, "region_id">;
};

export default function RegionSelect({ field }: Props) {
  const { countryId, setLocation } = useLocationStore();
  const { data: regions = [] } = useRegions(countryId ?? 0);

  return (
    <FormInput
      legend="Region"
      as="select"
      options={regions.map((r: any) => ({
        value: r.id.toString(),
        label: r.name,
      }))}
      value={field.value}
      onChange={(val) => {
        field.onChange(val);
        setLocation(Number(countryId), Number(val));
      }}
    />
  );
}
