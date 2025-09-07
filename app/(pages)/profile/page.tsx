"use client";
import { useState, FormEvent } from "react";
import FormInput from "@/app/components/form-input/FormInput";
import Me from "@/components/features/auth/Me";
import { useUpdateProfile } from "@/hooks/useMe";

const countries = [
  { id: 1, name: "Qaraqalpaqstan" },
  { id: 2, name: "Uzbekistan" },
  { id: 3, name: "Kazakhstan" },
  { id: 4, name: "Russia" },
];
const regions = [
  { id: 1, name: "Tashkent" },
  { id: 2, name: "Samarqand" },
  { id: 3, name: "Buxoro" },
];
const sectors = [
  "IT / Texnologiya",
  "Ta’lim",
  "Sog‘liqni saqlash",
  "Moliya / Bank",
  "Qurilish",
  "Qishloq xo‘jaligi",
  "Ishlab chiqarish",
  "Transport / Logistika",
  "Savdo / Marketing",
  "Turizm / Mehmonxona",
];
// const languages = ["Uzbek", "Russian", "English"];

const MyProfile = () => {
  const updateProfileMutation = useUpdateProfile();

  const [form, setForm] = useState({
    full_name: "",
    contact: "",
    company_name: "",
    country_id: countries[0].id,
    region_id: countries[0].id,
    language_code: "uz", // default
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfileMutation.mutate(form);
  };

  // useEffect(() => {
  //   // TODO: replace with API call
  //   setProfile({
  //     fullName: "John Doe",
  //     phone: "+998901234567",
  //     company: "Bizler Group",
  //     position: "Menejer",
  //     region: "Tashkent",
  //   });
  // }, []);

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
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
          value={form.country_id}
          onChange={(val) => handleChange("country_id", Number(val))}
        />
        <FormInput
          legend="Region"
          as="select"
          options={regions.map((c) => ({ value: c.id, label: c.name }))}
          value={form.region_id}
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
