"use client";
import { useState, FormEvent, useEffect } from "react";
import FormInput from "@/app/components/form-input/FormInput";
import Me from "@/components/features/auth/Me";
import { useMe, useUpdateProfile } from "@/hooks/useMe";
import { useCountries, useRegions } from "@/hooks/useCountries";

const MyProfile = () => {
  const { data: me } = useMe();
  const { data: countries = [] } = useCountries();
  const updateProfileMutation = useUpdateProfile();

  const [form, setForm] = useState({
    full_name: "",
    contact: "",
    company_name: "",
    country_id: 0,
    region_id: 0,
    language_code: "uz", // default
  });

  const { data: regions = [] } = useRegions(form.country_id);

  useEffect(() => {
    if (me) {
      setForm({
        full_name: me.full_name || "",
        contact: me.contact || "",
        company_name: me.company_name || "",
        country_id:
          me.country_id ?? (countries.length > 0 ? countries[0].id : 0),
        region_id: me.region_id ?? (regions.length > 0 ? regions[0].id : 0),
        language_code: me.language_code || "uz",
      });
    }
  }, [me, countries]);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 px-4">
      <h2 className="text-xl font-semibold mb-5">Meniń profilim</h2>
      <Me />

      <form onSubmit={handleSubmit} className="bg-background px-3 space-y-5">
        <FormInput
          legend="FAÁ"
          type="text"
          value={form.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
        />
        <FormInput
          legend="Jaylasqan mámleket"
          as="select"
          options={(countries ?? []).map((c: any) => ({
            value: String(c.id),
            label: c.name,
          }))}
          value={String(form.country_id)}
          onChange={(val) => handleChange("country_id", Number(val))}
        />
        <FormInput
          legend="Region"
          as="select"
          disabled={!form.region_id}
          options={regions.map((r: any) => ({
            value: String(r.id),
            label: r.name,
          }))}
          value={String(form.region_id)}
          onChange={(val) => handleChange("region_id", Number(val))}
        />
        <FormInput
          legend="Mekeme atı"
          type="text"
          value={form.company_name}
          onChange={(e) => handleChange("company_name", e.target.value)}
        />
        {/* <FormInput legend="Taraw" as="select" options={sectors} /> */}
        <FormInput
          legend="Baylanıs"
          type="text"
          value={form.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
        />
        {updateProfileMutation.isError && (
          <p className="text-red-500">
            {JSON.stringify(
              (updateProfileMutation.error as any).response?.data
            )}
          </p>
        )}
        {updateProfileMutation.isSuccess && (
          <p className="text-green-500">Profil awmetli janalandi ✅</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 mt-1 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateProfileMutation.isPending ? "Saqlanbaqda..." : "Saqlaw"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
