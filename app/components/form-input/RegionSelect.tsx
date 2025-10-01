"use client";
import FormInput from "@/app/components/form-input/FormInput";
import { useRegions } from "@/hooks/useCountries";
import { useT } from "@/hooks/useT";
import { useEffect, useRef } from "react";
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
  const t = useT();
  const prevCountryId = useRef<number | null>(countryId);

  // Set legend text based on translation
  const legendText = t("region") || "Region";

  // Reset region when country changes (but not on first load)
  useEffect(() => {
    // Only reset if the country actually changed (not null to a value, which happens on initialization)
    if (
      prevCountryId.current !== null &&
      prevCountryId.current !== countryId &&
      countryId !== null
    ) {
      if (field.value && field.value !== "0") {
        field.onChange("0");
        onRegionChange("");
      }
    }
    prevCountryId.current = countryId;
  }, [countryId, field, onRegionChange]);

  // Ensure the field value is valid when regions load
  useEffect(() => {
    if (!isLoading && regions.length > 0 && field.value) {
      const regionExists = regions.some(
        (r: any) => r.id.toString() === field.value
      );
      if (!regionExists && field.value !== "0") {
        // If the current value doesn't exist in loaded regions, keep it anyway
        // This handles the case where form data is set before regions are loaded
        // The value will be validated by the backend
      }
    }
  }, [isLoading, regions, field.value]);

  // If there's no country selected, show disabled state
  if (!countryId) {
    return (
      <FormInput
        legend={legendText}
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
        legend={legendText}
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
        legend={legendText}
        as="select"
        disabled={true}
        options={[{ value: "no-regions", label: "No regions available" }]}
        value=""
        onChange={() => {}}
      />
    );
  }

  const hasValidRegions = regions.length > 0;
  const regionOptions = hasValidRegions
    ? [
        { value: "0", label: `Select ${legendText.toLowerCase()}` },
        ...regions.map((r: any) => ({
          value: r.id.toString(),
          label: r.name
        }))
      ]
    : [{ value: "0", label: `No ${legendText.toLowerCase()}s available` }];

  // If field has a value but region isn't in loaded regions yet, add it temporarily
  const currentValue = field.value || "0";
  if (currentValue !== "0" && hasValidRegions) {
    const regionExists = regions.some(
      (r: any) => r.id.toString() === currentValue
    );
    if (!regionExists) {
      regionOptions.push({
        value: currentValue,
        label: `Region ${currentValue}` // Temporary label until regions refresh
      });
    }
  }

  return (
    <FormInput
      legend={legendText}
      as="select"
      disabled={!hasValidRegions}
      options={regionOptions}
      value={currentValue}
      onChange={(value) => {
        if (value === "0") {
          field.onChange("");
          onRegionChange("");
        } else {
          const stringValue = String(value);
          field.onChange(stringValue);
          onRegionChange(stringValue);
        }
      }}
    />
  );
}
