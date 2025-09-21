"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  VacancySchema,
  VacancyFormValue,
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useCreateVacancy } from "@/hooks/useVacancy";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const Vacancy = () => {
  const { data: me } = useMe();
  const createVacancyMutation = useCreateVacancy();
  const { setLocation, countryId } = useLocationStore();

  const userCountryId = me?.location?.country?.id ?? null;
  const userRegionId = me?.location?.region?.id ?? null;

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VacancyFormValue>({
    resolver: zodResolver(VacancySchema),
    defaultValues: {
      region_id: "",
      lawazim: "",
      mekeme: "",
      manzil: "",
      talaplar: "",
      májburiyatlar: "",
      jumisWaqiti: "",
      ayliq: "",
      baylanis: "",
      qosimsha: "",
    },
  });

  const { data: regions = [] } = useRegions(userCountryId ?? undefined);

  useEffect(() => {
    if (!me) return;
    reset({
      region_id: userRegionId?.toString() ?? "",
      lawazim: "",
      mekeme: "",
      manzil: "",
      talaplar: "",
      májburiyatlar: "",
      jumisWaqiti: "",
      ayliq: "",
      baylanis: "",
      qosimsha: "",
    });
  }, [me, reset, userRegionId]);

  useEffect(() => {
    if (regions.length && userRegionId) {
      setValue("region_id", userRegionId.toString());
    }
  }, [regions, userRegionId, setValue]);

  const onSubmit = (data: VacancyFormValue) => {
    setLocation(
      userCountryId ? Number(userCountryId) : null,
      data.region_id ? Number(data.region_id) : null
    );

    const payload = {
      country_id: userCountryId,
      region_id: data.region_id ? Number(data.region_id) : null,
      position_title: data.lawazim,
      organization_name: data.mekeme,
      address: data.manzil,
      requirements: data.talaplar,
      duties: data.májburiyatlar,
      work_schedule: data.jumisWaqiti,
      salary: data.ayliq,
      contact: data.baylanis,
      additional_info: data.qosimsha,
    };

    createVacancyMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">Jumisshi izlew</h2>

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
          legend="Lawazım"
          type="text"
          placeholder="Dizayner, menejer, esapshı h.t.b"
          registration={register("lawazim")}
          error={errors.lawazim?.message}
        />
        <FormInput
          legend="Mekeme"
          type="text"
          placeholder="Bizler Group, ООО Ромашка h.t.b"
          registration={register("mekeme")}
          error={errors.mekeme?.message}
        />
        <FormInput
          legend="Mánzil"
          type="text"
          placeholder="Москва, Tashkent h.t.b"
          registration={register("manzil")}
          error={errors.manzil?.message}
        />
        <FormInput
          legend="Talaplar"
          as="textarea"
          placeholder="Tájiriybe 2 jıl, Excel biliw, Inglis tili B2"
          registration={register("talaplar")}
          error={errors.talaplar?.message}
        />
        <FormInput
          legend="Májburiyatlar"
          as="textarea"
          placeholder="Klientlermen islew, esabatlar h.t.b"
          registration={register("májburiyatlar")}
          error={errors.májburiyatlar?.message}
        />
        <FormInput
          legend="Jumıs waqıtı "
          type="text"
          placeholder="9:00 - 18:00, erkin grafik, 5/2"
          registration={register("jumisWaqiti")}
          error={errors.jumisWaqiti?.message}
        />
        <FormInput
          legend="Aylıq"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("ayliq")}
          error={errors.ayliq?.message}
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Bonuslar, shárayatlar h.t.b"
          registration={register("qosimsha")}
          error={errors.qosimsha?.message}
        />

        {createVacancyMutation.isError && (
          <div className="text-red-500">
            Qatelik: {String(createVacancyMutation.error)}
          </div>
        )}
        {createVacancyMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {createVacancyMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default Vacancy;
