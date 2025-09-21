"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  ProjectSchema,
  ProjectFormValue,
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useCreateProject } from "@/hooks/useProject";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const Project = () => {
  const { data: me } = useMe();
  const { countryId, regionId, setLocation } = useLocationStore();
  const createProjectMutation = useCreateProject();

  const userCountryId = me?.location?.country?.id ?? null;
  const userRegionId = me?.location?.region?.id ?? null;

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValue>({
    defaultValues: {
      region_id: regionId?.toString() ?? "",
    },
    resolver: zodResolver(ProjectSchema),
  });

  const { data: regions = [] } = useRegions(userCountryId ?? undefined);

  useEffect(() => {
    if (!me) return;
    reset({
      region_id: userRegionId?.toString() ?? "",
      lawazim: "",
      talaplar: "",
      tólem: "",
      deadline: "",
      baylanis: "",
      manzil: "",
      qosimsha: "",
    });
  }, [me, reset, userRegionId]);

  useEffect(() => {
    if (regions.length && regionId) {
      setValue("region_id", regionId.toString());
    }
  }, [regions, regionId, setValue]);

  const onSubmit = (data: ProjectFormValue) => {
    setLocation(
      countryId ?? null,
      data.region_id ? Number(data.region_id) : null
    );
    const payload = {
      country_id: countryId,
      region_id: data.region_id ? Number(data.region_id) : null,
      who_needed: data.lawazim,
      task_description: data.talaplar,
      deadline: data.deadline,
      salary: data.tólem,
      contact: data.baylanis,
      address: data.manzil,
      additional_info: data.qosimsha,
    };

    createProjectMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Bir mártelik wazıypa/joybar
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
                setLocation(countryId ?? null, Number(val));
              }}
            />
          )}
        />
        <FormInput
          legend="Sizge kim kerek?"
          type="text"
          placeholder="Santexnik, Dilmash, Mobilograf, Muzikant"
          registration={register("lawazim")}
          error={errors.lawazim?.message}
        />
        <FormInput
          legend="Ne islew kerek?"
          as="textarea"
          placeholder="Júk tasıw kerek, ońlaw kerek, logotip yáki video túsiriw kerek h.t.b. Tapsırmanı qısqasha jazıń."
          registration={register("talaplar")}
          error={errors.talaplar?.message}
        />
        <FormInput
          legend="Is haqı, tólem"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("tólem")}
          error={errors.tólem?.message}
        />
        <FormInput
          legend="Orınlaw múddeti"
          placeholder="Búginge, 18:00 ge yáki 27 avgustqa shekem"
          registration={register("deadline")}
          error={errors.deadline?.message}
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="+998901234567, ab@email.com, @user"
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FormInput
          legend="Mánzil, lokaciya"
          type="text"
          placeholder="Nókis, A.Dosnazarov 16, online"
          registration={register("manzil")}
          error={errors.manzil?.message}
        />
        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Qosımsha zat bolsa jazıń"
          error={errors.qosimsha?.message}
        />
        {createProjectMutation.isError && (
          <div className="text-red-500">
            <p>Qatelik: {String(createProjectMutation.error)}</p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createProjectMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createProjectMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {createProjectMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {createProjectMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default Project;
