"use client";
import { ControllerRenderProps } from "react-hook-form";
import { useRegions } from "@/hooks/useCountries";
import FormInput from "@/app/components/form-input/FormInput";

type Props = {
  field: ControllerRenderProps<any, "region_id">;
  countryId: number | null;
  onRegionChange: (val: string) => void;
};

export default function RegionSelect({
  field,
  countryId,
  onRegionChange,
}: Props) {
  const { data: regions = [] } = useRegions(countryId ?? 0);

  return (
    <FormInput
      legend="Region"
      as="select"
      disabled={countryId === null}
      options={regions.map((r: any) => ({
        value: r.id.toString(),
        label: r.name,
      }))}
      value={field.value}
      onChange={(e) => {
        field.onChange(e);
        onRegionChange(
          (e as React.ChangeEvent<HTMLSelectElement>).target.value
        );
      }}
    />
  );
}
