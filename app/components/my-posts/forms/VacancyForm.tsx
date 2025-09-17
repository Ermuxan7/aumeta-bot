"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  VacancySchema,
  VacancyFormValue,
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { useIdUpdateVacancy } from "@/hooks/useVacancy";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import RegionSelect from "../../form-input/RegionSelect";

type VacancyFormProps = {
  data: any;
};

const VacancyEditForm = ({ data }: VacancyFormProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VacancyFormValue>({
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
    resolver: zodResolver(VacancySchema),
  });

  const { setLocation, countryId, regionId } = useLocationStore();

  useEffect(() => {
    if (data) {
      reset({
        region_id: data.location?.region?.id?.toString() ?? "",
        lawazim: data.position_title ?? "",
        mekeme: data.organization_name ?? "",
        manzil: data.address ?? "",
        talaplar: data.requirements ?? "",
        májburiyatlar: data.duties ?? "",
        jumisWaqiti: data.work_schedule ?? "",
        ayliq: data.salary ?? "",
        baylanis: data.contact ?? "",
        qosimsha: data.additional_info ?? "",
      });
      setLocation(
        data.location?.country?.id ?? 0,
        data.location?.region?.id ?? 0
      );
    }
  }, [data, reset, setLocation]);

  const updateVacancyMutation = useIdUpdateVacancy(data.id);

  const onSubmit = (data: VacancyFormValue) => {
    const payload = {
      country_id: countryId,
      region_id: regionId,
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

    updateVacancyMutation.mutate(payload);
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
              countryId={countryId ?? 0}
              onRegionChange={(val) => {
                field.onChange(val);
                setLocation(countryId ?? 0, Number(val));
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
          placeholder="Bizler Group, ООО Ромашка, Delivery Express h.t.b"
          registration={register("mekeme")}
          error={errors.mekeme?.message}
        />
        <FormInput
          legend="Mánzil"
          type="text"
          placeholder="Москва, Tashkent, Ақтау, Бишкек ул. h.t.b"
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
          placeholder="Klientlermen islew, esabatlar, satıw kerek h.t.b"
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
          placeholder="Bonuslar, shárayatlar h.t.b qolaylıqlar"
          registration={register("qosimsha")}
          error={errors.qosimsha?.message}
        />
        {updateVacancyMutation.isError && (
          <div className="text-red-500">
            <p>Qatelik: {String(updateVacancyMutation.error)}</p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateVacancyMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateVacancyMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}

        {updateVacancyMutation.isSuccess && (
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {updateVacancyMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default VacancyEditForm;
