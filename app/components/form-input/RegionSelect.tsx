"use client";
import FormInput from "@/app/components/form-input/FormInput";
import { useRegions } from "@/hooks/useCountries";
import { useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<any, "region_id">;
  countryId: number | null;
  onRegionChange: (value: string | number) => void;
};

export default function RegionSelect({
  field,
  countryId,
  onRegionChange
}: Props) {
  const { data: regions = [], isLoading, isError } = useRegions(countryId);

  // Reset region when country changes or no country is selected
  useEffect(() => {
    if (!countryId || isError) {
      if (field.value) {
        field.onChange("");
        onRegionChange("");
      }
    }
  }, [countryId, isError, field, onRegionChange]);

  // If there's no country selected, show disabled state
  if (!countryId) {
    return (
      <FormInput
        legend="Region"
        as="select"
        disabled={true}
        options={[{ value: "no-country", label: "Select a country first" }]}
        value=""
        onChange={() => {}}
      />
    );
  }

  // Show loading or error states
  if (isLoading) {
    return (
      <FormInput
        legend="Region"
        as="select"
        disabled={true}
        options={[{ value: "loading", label: "Loading regions..." }]}
        value=""
        onChange={() => {}}
      />
    );
  }

  if (isError || !regions.length) {
    return (
      <FormInput
        legend="Region"
        as="select"
        disabled={true}
        options={[{ value: "no-regions", label: "No regions available" }]}
        value=""
        onChange={() => {}}
      />
    );
  }

  const regionOptions = regions.map((r: any) => ({
    value: r.id.toString(),
    label: r.name
  }));

  return (
    <FormInput
      legend="Region"
      as="select"
      disabled={false}
      options={regionOptions}
      value={field.value || ""}
      onChange={(value) => {
        field.onChange(value);
        onRegionChange(value);
      }}
    />
  );
}
