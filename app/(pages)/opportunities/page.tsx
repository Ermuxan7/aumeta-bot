"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import FileUpload from "@/app/components/upload/FileUpload";
import {
  OpportunitiesSchema,
  OpportunitiesFormValue,
} from "@/app/schema/Opportunities";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { file } from "zod";

const Opportunities = () => {
  const { data: me } = useMe();
  const createOpportunityMutation = useOpportunities();
  const { setLocation, countryId, regionId } = useLocationStore();

  const userCountryId = me?.location?.country?.id ?? null;
  const userRegionId = me?.location?.region?.id ?? null;

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OpportunitiesFormValue>({
    defaultValues: {
      region_id: "",
    },
    resolver: zodResolver(OpportunitiesSchema),
  });

  const { data: regions = [] } = useRegions(userCountryId ?? undefined);
  const fileRef = useRef<File | null>(null);

  const oneFileSelect = (file: File | null) => {
    fileRef.current = file;
  };

  useEffect(() => {
    if (!me) return;
    reset({
      region_id: userRegionId?.toString() ?? "",
      daǵaza: "",
      baylanis: "",
    });
  }, [me, reset, userRegionId]);

  useEffect(() => {
    if (regions.length && userRegionId) {
      setValue("region_id", userRegionId.toString());
    }
  }, [regions, userRegionId, setValue]);

  const onSubmit = (data: OpportunitiesFormValue) => {
    setLocation(
      userCountryId ? Number(userCountryId) : null,
      data.region_id ? Number(data.region_id) : null
    );

    const formData = new FormData();
    formData.append("country_id", String(userCountryId ?? ""));
    formData.append("region_id", String(userRegionId ?? ""));
    formData.append("content", data.daǵaza);
    formData.append("contact", data.baylanis);

    if (fileRef.current) {
      formData.append("img", fileRef.current, fileRef.current.name);
    }

    createOpportunityMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Imkaniyatlar & grantlar
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <Controller
          name="region_id"
          control={control}
          render={({ field }) => (
            <RegionSelect
              field={field}
              countryId={countryId}
              onRegionChange={(val) => {
                field.onChange(val);
                setLocation(userCountryId ?? null, Number(val));
              }}
            />
          )}
        />
        <FormInput
          legend="Daǵaza teksti yáki mazmunı"
          as="textarea"
          // rows={5}
          placeholder="Daǵaza mazmunı"
          registration={register("daǵaza")}
          error={errors.daǵaza?.message}
        />

        <FormInput
          legend="Baylanıs yáki silteme"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FileUpload oneFileSelect={oneFileSelect} />
        {createOpportunityMutation.isError && (
          <div className="text-red-500">
            <p>Qatelik: {String(createOpportunityMutation.error)}</p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createOpportunityMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createOpportunityMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {createOpportunityMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {createOpportunityMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default Opportunities;
